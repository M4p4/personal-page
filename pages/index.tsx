const HomePage = () => {
  return (
    <>
      <div className="rounded-md h-72 w-full bg-orange-200"></div>
      <div className="bg-transparent text-center w-full p-5">
        I am currently working in 🇵🇭 but soon i am back in 🇩🇪
      </div>

      <div className="px-2 md:px-10">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col py-2">
            <h1 className="text-4xl font-semibold">Jaro Ratz</h1>
            <p>Web Developer and SEO Specialist</p>
          </div>
          <div className="rounded-full h-24 w-24 min-h-25 bg-orange-200"></div>
        </div>

        <div className="py-4">
          <h2 className="text-xl font-semibold">Work</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Doloremque, illo accusantium, facilis error ab molestias ratione
            excepturi odit sapiente ex libero, inventore provident quidem minus?
            Assumenda nemo aliquam qui excepturi.
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-xl font-semibold">Latest Posts</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-around items-center">
            <div className="flex flex-col w-full">
              <div className="rounded-md h-36 w-full bg-orange-200"></div>
              <div>This is a post title example</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="rounded-md h-36 w-full bg-orange-200"></div>
              <div>This is a post title example</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
