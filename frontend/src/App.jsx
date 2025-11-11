import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Feed from "./components/Feed";

function App() {
  const blogs = [
    {
      title: "The Coffee That Started My Morning Routine",
      author: "Ananya Sharma",
      content:
        "It began with one cup of black coffee before sunrise. Now it’s a ritual that defines my day",
    },
    {
      title: "Why Night Walks Boost Creativity",
      author: "Ethan Miller",
      content:
        "When the city sleeps, your brain connects dots it couldn’t in the noise. Some of my best ideas have come under a dim streetlight, not at my desk.",
    },
    {
      title: "Building Systems, Not Goals",
      author: "Noor",
      content:
        "Goals are temporary; systems last. Instead of aiming to write a book, build the habit of writing 200 words every morning — the book will write itself.",
    },
    {
      title: "Minimalism Isn’t About Owning Less",
      author: "Riya Patel",
      content:
        "It’s not about having fewer things; it’s about removing distractions that stop you from focusing on what actually matters.",
    },
    {
      title: "How Music Helps Me Code Better",
      author: "Vinit Rana",
      content:
        "It’s not lo-fi or synthwave that helps — it’s rhythm. Repetitive beats keep me in flow. It’s not about escaping noise, it’s about controlling it.",
    },
    {
      title: "The Art of Doing Nothing",
      author: "Oliver Brooks",
      content:
        "We glorify productivity, but stillness is underrated. Sitting quietly for ten minutes a day can clear mental cache better than any meditation app.",
    },
    {
      title: "Learning to Cook Taught Me Patience",
      author: "Sana Kapoor",
      content:
        "Cooking isn’t about recipes, it’s about rhythm. You can’t rush onions turning golden — and that’s the best metaphor for personal growth I’ve found.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* navbar */}
      <Navbar brand="Novus" /> 

      <h1 className="text-xl text-white mt-5 flex justify-center">Latest blogs</h1>

      {/* main-feed */}
      <main className="flex-grow w-full flex justify-center">
        <div className="flex-grow w-full px-21 py-15">
          <Feed blogs={blogs} />
        </div>
      </main>

      {/* footer */}
      <Footer year="2025" name="Novus" />
    </div>
  );
}

export default App;