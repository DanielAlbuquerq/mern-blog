import { Button } from "flowbite-react"

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 md:pl-[6em] lg:pl-[6em] border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center ">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 JavaScript Projects
        </p>

        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none rounded-tr-none"
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 JavaScript Projects
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XlURXRsnoqHaFZKzwVbXTGOUMnybhHz9eg&usqp=CAU"
          alt="Error on Img"
        />
      </div>
    </div>
  )
}
