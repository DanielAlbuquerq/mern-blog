export default function About() {
  return <div className="min-h-screen flex items-center justify-center">
    <div className="rounded-3xl border max-w-2xl mx-auto p-3 text-center bg-amber-200 dark:bg-transparent ">
        <h1 className="text-2xl font-bold text-center my-7">About Stacks Blog</h1>
        <div className="text-md text-gray-500 flex flex-col gap-6">
          <p>
          Why do we use it?
                It is a long established fact that a reader will 
                be distracted by the readable content of a page 
                when looking at its layout. The point of using 
                Lorem Ipsum is that it has a more-or-less normal 
                distribution of letters, as opposed to using 
                'Content here, content here', making it look like 
                readable English. Many desktop publishing packages and 
                web page editors now use Lorem Ipsum as their default model text, 
                and a search for 'lorem ipsum' will uncover many web sites still in
                 their infancy. Various versions have evolved over the years, sometimes by 
                 accident, sometimes on purpose (injected humour and the like).
          </p>
          <p>
          Why do we use it?
                It is a long established fact that a reader will default model text, 
                and a search for 'lorem ipsum' will uncover many web sites still in
                 their infancy. Various versions have evolved over the years, sometimes by 
                 accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>
    </div>
  </div>;
}
