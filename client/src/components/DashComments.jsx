/* eslint-disable no-extra-semi */
import { Table, Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Modal } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FaCheck, FaTimes } from "react-icons/fa"

export default function DashComments() {
  //DashPosts runs and then jump to if (currentUser.isAdmin)
  //our if activate useEffect based on currentUser._id

  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [commentIdToDelete, setCommentIdToDelete] = useState("")
  console.log("DashPost Activate")

  useEffect(() => {
    console.log("useEffect triggered")
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`)
        const data = await res.json()
        console.log("adminComments")
        console.log(data)
        if (res.ok) {
          setComments(data.comments)
          if (data.comments.length < 9) {
            console.log("comments less than 9")
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    if (currentUser.isAdmin) {
      fetchComments()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = comments.length
    try {
      const res = await fetch(`/api/user/getComments?startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments])
        if (data.comments.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDeleteComment = async () => {
    setShowModal(false)
    try {
      const res = await fetch(`/api/user/delete/${commentIdToDelete}`, {
        method: "DELETE",
      })

      console.log("PostIdDelete: " + commentIdToDelete)
      const data = await res.json()
      console.log(data)

      if (!res.ok) {
        console.log(data.message)
      } else {
        console.log("userDeleted")
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>Post Id</Table.HeadCell>
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            {comments.map((comment, index) => (
              <Table.Body className="divide-y" key={index}>
                <Table.Row className="hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="truncate">
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell className="w-[10px] truncate">{comment.likes.length}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell className="flex justify-center" >
                    {currentUser._id}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true)
                        setCommentIdToDelete(comment._id)
                      }}
                      className="text-red-400 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full hover:underline text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p> You have no comments yet </p>
      )}

      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                {"Yes I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
