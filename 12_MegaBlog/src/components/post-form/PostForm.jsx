import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import authService from '../../appwrite/auth'


function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state?.auth?.userData)
    const dispatch = useDispatch()

    const submit = async (data) => {
        try {
            if (!userData) {
                // if user is not authenticated, redirect to login to obtain session
                navigate('/login')
                return
            }
            // handle file upload if provided
            let uploadedFile = null
            if (data.image && data.image.length > 0) {
                uploadedFile = await appwriteService.uploadFile(data.image[0])
            }

            // ensure we have a valid user id; if not, try to refresh current user from Appwrite
            let currentUser = userData
            if (!currentUser?.$id) {
                try {
                    const fresh = await authService.getCurrentUser()
                    if (fresh) {
                        currentUser = fresh
                        dispatch(login(fresh))
                    }
                } catch (e) {
                    // ignore
                }
            }

            if (!currentUser?.$id) {
                // still not authenticated
                navigate('/login')
                return
            }

            if (post) {
                // updating existing post
                // if new file uploaded, delete old and set new featuredImage
                if (uploadedFile && post.featuredImage) {
                    try { await appwriteService.deleteFile(post.featuredImage) } catch(e) { /* ignore */ }
                }

                const payload = {
                    ...data,
                    featuredImage: uploadedFile ? uploadedFile.$id : post.featuredImage,
                }

                const dbPost = await appwriteService.updatePost(post.$id, payload)
                if (dbPost) navigate(`/post/${dbPost.slug || dbPost.$id}`)
            } else {
                // creating new post
                const payload = {
                    ...data,
                    featuredImage: uploadedFile ? uploadedFile.$id : undefined,
                    userId: currentUser.$id,
                }

                const dbPost = await appwriteService.createPost(payload)
                if (dbPost) navigate(`/post/${dbPost.slug || dbPost.$id}`)
            }
        } catch (err) {
            console.error('Post submit error', err)
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                // remove invalid chars
                .replace(/[^a-z0-9\s-]/g, '')
                // collapse whitespace and replace with '-'
                .replace(/\s+/g, '-')
                // remove duplicate dashes
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')
        }
        return ''
    }, [])

    React.useEffect(() => {
        const superMan = watch((value, { name }) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title,
                    { shouldValidate: true}
                ))
            }
        })

        return () => {
            superMan.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm