const HomePage = () => {
  return (
    <>
      <div className="rounded-md h-72 w-full bg-orange-200"></div>
      <div className="bg-transparent text-center w-full p-5">
        I am currently working from 🇵🇭 but soon i am back in 🇩🇪
      </div>

      <div className="px-2 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col py-2 w-full md:w-auto">
            <h1 className="text-4xl font-semibold dark:text-zinc-100">
              Jaro Ratz
            </h1>
            <p>Web Developer and SEO Specialist</p>
          </div>
          <div className="rounded-full h-24 w-24 min-h-25 bg-orange-200"></div>
        </div>

        <div className="py-4">
          <h2 className="text-xl font-semibold dark:text-zinc-100 py-1">
            Work
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Doloremque, illo accusantium, facilis error ab molestias ratione
            excepturi odit sapiente ex libero, inventore provident quidem minus?
            Assumenda nemo aliquam qui excepturi.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-xl font-semibold dark:text-zinc-100 py-1">
            Latest Posts
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-around items-center">
            <div className="flex flex-col w-full group">
              <div className="relative rounded-md h-36 w-full bg-orange-200">
                <div className="absolute bottom-1 left-1">
                  <span className="opacity-0 text-xs bg-orange-300 dark:bg-zinc-600 p-1 rounded-md group-hover:opacity-80 duration-500 ease-in-out">
                    3333 views
                  </span>
                </div>
                <div className="absolute bottom-1 right-1">
                  <span className="opacity-0 text-xs bg-orange-300 dark:bg-zinc-600 p-1 rounded-md group-hover:opacity-80 duration-500 ease-in-out">
                    4 min read
                  </span>
                </div>
              </div>
              <div className="text-center py-2">
                This is a post title example
              </div>
            </div>

            <div className="flex flex-col w-full group">
              <div className="relative rounded-md h-36 w-full bg-orange-200">
                <div className="absolute bottom-1 left-1">
                  <span className="opacity-0 text-xs bg-orange-300 dark:bg-zinc-600 p-1 rounded-md group-hover:opacity-80 duration-500 ease-in-out">
                    3333 views
                  </span>
                </div>
                <div className="absolute bottom-1 right-1">
                  <span className="opacity-0 text-xs bg-orange-300 dark:bg-zinc-600 p-1 rounded-md group-hover:opacity-80 duration-500 ease-in-out">
                    4 min read
                  </span>
                </div>
              </div>
              <div className="text-center py-2">
                This is a post title example
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
