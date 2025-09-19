const featuredItems = [
  {
    title: "Readers in Action",
    description: "People enjoying books together in the library.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Author Meet & Greet",
    description: "An author interacting with readers during a session.",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Literary Get-Together",
    description: "Friends discussing books in a cozy environment.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Library Moments",
    description: "Peaceful reading inside a beautiful library.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Creative Writing Workshop",
    description: "Writers brainstorming ideas and creating stories.",
    image:
      "https://images.unsplash.com/photo-1509057199576-632a47484ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Library Moments",
    description: "Peaceful reading inside a beautiful library.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
];

const FeaturedSection = () => {
  return (
    <div className="py-10 bg-base-200">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl font-bold text-primary mb-2">
          🌟 Featured Moments
        </h2>
        <p className="text-base-content text-md max-w-xl mx-auto">
          Capturing the spirit of readers, writers, and literary gatherings.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-6xl mx-auto">
        {featuredItems.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md bg-base-100 group aspect-square"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Hover Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-black/70 text-white p-3 text-sm flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
