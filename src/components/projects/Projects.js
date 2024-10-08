import React from "react";
import Title from "../layouts/Title";
import ProjectsCard from "./ProjectsCard";

const array = [
  {
    url: "https://www.youtube.com/watch?v=JY6QUQE8eyY&list=PLasRGNDhAMK6O5xaoT8JvczlnM8iz2pjf",
    src: "https://i.ytimg.com/vi/JY6QUQE8eyY/hqdefault.jpg",
    title: "Black Myth: Wukong",
  },
  {
    url: "https://www.youtube.com/watch?v=ZCykomhO74w&list=PLasRGNDhAMK4CrE0UOp2hWVfcE9vWBgwR",
    src: "https://i.ytimg.com/vi/ZCykomhO74w/hqdefault.jpg",
    title: "ELDEN RING: Shadow of the Erdtree",
  },
  {
    url: "https://www.youtube.com/results?search_query=black+canary+valorant",
    src: "https://i.ytimg.com/vi/Pa0eA1gGZo0/hqdefault.jpg",
    title: "Valorant",
  },
  {
    url: "https://www.youtube.com/watch?v=s2rXj1ULO2s&list=PLasRGNDhAMK4Y7A1DfUn0suvcoXf_b9WP",
    src: "https://i.ytimg.com/vi/s2rXj1ULO2s/hqdefault.jpg",
    title: "Kamla",
  },
  {
    url: "https://www.youtube.com/watch?v=kN_qpTMSbzw&list=PLasRGNDhAMK7mrgwFHwSvoeoW1LFvQAvR",
    src: "https://i.ytimg.com/vi/kN_qpTMSbzw/hqdefault.jpg",
    title: "Senua's Saga: Hellblade II ",
  },
  {
    url: "https://www.youtube.com/watch?v=FEVgWz0MthI&list=PLasRGNDhAMK5fEO4HTcvNxaajcjtHn_DO",
    src: "https://i.ytimg.com/vi/FEVgWz0MthI/hqdefault.jpg",
    title: "Ghosts of Tsushima",
  },
  {
    url: "https://www.youtube.com/watch?v=sjtVl2QVQiY&list=PLasRGNDhAMK5MbAQ8mQ1bq53XB5ra9OUN",
    src: "https://i.ytimg.com/vi/sjtVl2QVQiY/hqdefault.jpg",
    title: "Party Animals",
  },
  {
    url: "https://www.youtube.com/watch?v=QJioknD0318&list=PLasRGNDhAMK7InzsbVvzr7hJ2b211mHOc",
    src: "https://i.ytimg.com/vi/QJioknD0318/hqdefault.jpg",
    title: "Tell Me Why",
  },
  {
    url: "https://www.youtube.com/watch?v=Bjo86W36C-8&list=PLasRGNDhAMK5iSr7V5BB3c7qNOfri1AO4",
    src: "https://i.ytimg.com/vi/Bjo86W36C-8/hqdefault.jpg",
    title: "Red Dead Redemption 2",
  },
  {
    url: "https://www.youtube.com/watch?v=U2YU-QGgWFo&list=PLasRGNDhAMK5EC2TYSu1UdGlCZ0b-AdYX",
    src: "https://i.ytimg.com/vi/U2YU-QGgWFo/hqdefault.jpg",
    title: "Elden Ring",
  },
  {
    url: "https://www.youtube.com/watch?v=kRRoC2r23vk&list=PLasRGNDhAMK7DwhMXbMHoG-XdEzTq3fEr",
    src: "https://i.ytimg.com/vi/kRRoC2r23vk/hqdefault.jpg",
    title: "PalWorld",
  },
  {
    url: "https://www.youtube.com/watch?v=1Hm2jsy7nOg&list=PLasRGNDhAMK5v-0n4arUYEbzLICNQh35f",
    src: "https://i.ytimg.com/vi/1Hm2jsy7nOg/hqdefault.jpg",
    title: "Alan Wake II",
  },
  {
    url: "https://www.youtube.com/watch?v=BzEKLH3yOmo&list=PLasRGNDhAMK6AsB49YJDmWRcSyWf06hof",
    src: "https://i.ytimg.com/vi/BzEKLH3yOmo/hqdefault.jpg",
    title: "Detroit: Become Human",
  },
  {
    url: "https://www.youtube.com/watch?v=9PzsNlhZZZg&list=PLasRGNDhAMK48GMOa3jxiszUxSshtCBBh",
    src: "https://i.ytimg.com/vi/9PzsNlhZZZg/hqdefault.jpg",
    title: "30 Days Challenge",
  },
  {
    url: "https://www.youtube.com/watch?v=Mc627_7_wiY&list=PLasRGNDhAMK4MbKHaoV_hFWhjMjCvLvGK",
    src: "https://i.ytimg.com/vi/Mc627_7_wiY/hqdefault.jpg",
    title: "Pico Park",
  },
  {
    url: "https://www.youtube.com/watch?v=6hQNOaqKX-M&list=PLasRGNDhAMK69tEYL3lBuZCchoZu7gqKI",
    src: "https://i.ytimg.com/vi/6hQNOaqKX-M/hqdefault.jpg",
    title: "It Takes Two",
  },
  {
    url: "https://www.youtube.com/watch?v=CTgklyOkbPI&list=PLasRGNDhAMK7ghgLBeE5wqwFmCE-PseQw",
    src: "https://i.ytimg.com/vi/CTgklyOkbPI/hqdefault.jpg",
    title: "The Last of Us",
  },
  {
    url: "https://www.youtube.com/watch?v=nPBkg5-A9Eo&list=PLasRGNDhAMK4jCQ_VXIHBngBL4Ba_fcgg",
    src: "https://i.ytimg.com/vi/nPBkg5-A9Eo/hqdefault.jpg",
    title: "Propnight",
  },
  {
    url: "https://www.youtube.com/watch?v=F5pJaso7Rl0&list=PLasRGNDhAMK4sCe1nC20pWOceDY3Drt-B",
    src: "https://i.ytimg.com/vi/F5pJaso7Rl0/hqdefault.jpg",
    title: "A Way Out",
  },
  {
    url: "https://www.youtube.com/watch?v=AL5N6DZJnK8&list=PLasRGNDhAMK6qVpWw6Jm4wAZw9MQdUTKf",
    src: "https://i.ytimg.com/vi/AL5N6DZJnK8/hqdefault.jpg",
    title: "A Plague Tale: Innocence",
  },
  {
    url: "https://www.youtube.com/watch?v=YWIdpSjk0a4&list=PLasRGNDhAMK7bn12YJE61ofK_RlSFR_h1",
    src: "https://i.ytimg.com/vi/YWIdpSjk0a4/hqdefault.jpg",
    title: "Kena: Bridge of Spirits",
  },
  {
    url: "https://www.youtube.com/watch?v=E4rVsUPeVqE&list=PLasRGNDhAMK6i07dQDzHMe_tWfoSNHTnw",
    src: "https://i.ytimg.com/vi/E4rVsUPeVqE/hqdefault.jpg",
    title: "Hellblade: Senua's Sacrifice",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="flex justify-center items-center text-center">
        <Title
          title="THE GAMES I HAVE PLAYED"
          des="Videos"
          title2={"(Variety Streamer for a reason)"}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        {array.map((item, index) => (
          <ProjectsCard title={item.title} url={item.url} src={item.src} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
