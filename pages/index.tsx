import Image from 'next/image';
import Posts from '../components/posts/Posts';

const HomePage = () => {
  return (
    <>
      <div className="rounded-md h-72 w-full bg-orange-200"></div>

      <div className="px-2 md:px-10">
        <div className="bg-orange-100/70 dark:bg-zinc-700/30 text-center w-full p-5 rounded-md my-3">
          I am currently working from 🇵🇭 but I will be back soon in 🇩🇪
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col py-2 w-full md:w-auto">
            <h1 className="text-4xl font-semibold dark:text-zinc-100">
              Jaro Ratz
            </h1>
            <p>Web Developer and SEO Specialist</p>
          </div>

          <Image
            className="rounded-full h-24 w-24 min-h-25 border border-orange-100"
            src="/images/me.jpg"
            alt="Jaro Ratz"
            width={100}
            height={100}
          />
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
          <Posts />
        </div>
      </div>
    </>
  );
};

export default HomePage;
