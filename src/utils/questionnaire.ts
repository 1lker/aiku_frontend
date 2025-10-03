export interface Option {
  text: string;
  description: string;
  imageId?: number; // Picsum image ID
  tags?: string[];
}

export interface Question {
  day: number;
  startTime: string;
  endTime: string;
  options: Option[];
  category?: "breakfast" | "activity" | "lunch" | "culture" | "evening" | "dinner" | "nightlife";
}

// Mock: fetch a questionnaire definition from server
export async function fetchMockQuestionnaire(days: number = 3): Promise<Question[]> {
  const data: Question[] = [];

  // Day 1 - Arrival & Exploration
  data.push(
    {
      day: 1,
      startTime: "08:00",
      endTime: "09:30",
      category: "breakfast",
      options: [
        {
          text: "Traditional German Breakfast at Local Café",
          description:
            "Start with fresh brötchen, cheese, cold cuts, and excellent coffee in a cozy neighborhood café",
          imageId: 292,
          tags: ["local", "traditional", "cozy"],
        },
        {
          text: "Café Einstein Stammhaus - Viennese Breakfast",
          description:
            "Classic Viennese atmosphere with omelets, pastries, and premium coffee in an elegant setting",
          imageId: 431,
          tags: ["elegant", "viennese", "premium"],
        },
        {
          text: "Quick Breakfast at Alexanderplatz",
          description:
            "Grab-and-go option near the TV Tower. Perfect for early starters who want to maximize sightseeing time",
          imageId: 312,
          tags: ["quick", "convenient", "modern"],
        },
        {
          text: "Rooftop Breakfast with City Views",
          description:
            "Panoramic breakfast at Monkey Bar with stunning views of Berlin Zoo and city skyline",
          imageId: 787,
          tags: ["views", "instagram", "premium"],
        },
      ],
    },
    {
      day: 1,
      startTime: "09:30",
      endTime: "13:00",
      category: "culture",
      options: [
        {
          text: "Museum Island World Heritage Tour",
          description:
            "Explore Pergamon Museum and Neues Museum featuring ancient artifacts and Nefertiti bust",
          imageId: 1033,
          tags: ["culture", "history", "unesco"],
        },
        {
          text: "Berlin Cathedral & Lustgarten Walk",
          description:
            "Visit the impressive Protestant cathedral, climb the dome for panoramic views, and stroll through gardens",
          imageId: 152,
          tags: ["architecture", "views", "historic"],
        },
        {
          text: "Brandenburg Gate & Reichstag Tour",
          description:
            "See Berlin's iconic symbols of reunification and book a dome visit to the German Parliament",
          imageId: 26,
          tags: ["iconic", "political", "photo-op"],
        },
        {
          text: "East Side Gallery Street Art Tour",
          description:
            "Walk along the longest remaining Berlin Wall section covered in murals by international artists",
          imageId: 564,
          tags: ["art", "history", "outdoor"],
        },
      ],
    },
    {
      day: 1,
      startTime: "13:00",
      endTime: "14:30",
      category: "lunch",
      options: [
        {
          text: "Currywurst at Curry 36",
          description:
            "Berlin's most famous street food - grilled sausage with curry ketchup. A must-try local institution!",
          imageId: 365,
          tags: ["street-food", "iconic", "budget"],
        },
        {
          text: "Markthalle Neun Food Market",
          description:
            "International food hall with diverse options from Thai to Turkish, Italian to Vietnamese cuisine",
          imageId: 543,
          tags: ["variety", "trendy", "indoor"],
        },
        {
          text: "Prenzlauer Berg Organic Café",
          description:
            "Healthy bowls, fresh salads, and organic sandwiches in Berlin's hippest neighborhood",
          imageId: 225,
          tags: ["healthy", "organic", "trendy"],
        },
        {
          text: "Traditional German Restaurant",
          description:
            "Schnitzel, sausages, and sauerkraut with German beer in an authentic beer garden setting",
          imageId: 326,
          tags: ["traditional", "hearty", "beer"],
        },
      ],
    },
    {
      day: 1,
      startTime: "14:30",
      endTime: "18:00",
      category: "activity",
      options: [
        {
          text: "Berlin Wall Memorial & Documentation Center",
          description:
            "Moving outdoor exhibition showing the Wall's history and stories of divided families",
          imageId: 110,
          tags: ["history", "educational", "outdoor"],
        },
        {
          text: "Hackesche Höfe Shopping & Galleries",
          description:
            "Explore interconnected Art Nouveau courtyards filled with boutiques, galleries, and cafés",
          imageId: 678,
          tags: ["shopping", "art", "architecture"],
        },
        {
          text: "Tiergarten Park & Victory Column",
          description:
            "Relax in Berlin's Central Park, visit the Golden Elsie tower, and enjoy nature in the city",
          imageId: 901,
          tags: ["nature", "relaxing", "photo-op"],
        },
        {
          text: "TV Tower & Alexanderplatz Experience",
          description:
            "Ascend the iconic Fernsehturm for 360° views and explore the bustling square below",
          imageId: 823,
          tags: ["views", "iconic", "modern"],
        },
      ],
    },
    {
      day: 1,
      startTime: "18:00",
      endTime: "19:30",
      category: "evening",
      options: [
        {
          text: "Sunset at Tempelhofer Feld",
          description:
            "Watch sunset at the former airport turned massive public park. Perfect for relaxing or cycling",
          imageId: 721,
          tags: ["sunset", "unique", "outdoor"],
        },
        {
          text: "Spree River Cruise",
          description:
            "Evening boat tour along the river, passing major landmarks with audio guide and drinks available",
          imageId: 514,
          tags: ["scenic", "relaxing", "romantic"],
        },
        {
          text: "Gendarmenmarkt Square Evening Stroll",
          description:
            "Visit Berlin's most beautiful square as it lights up, with twin churches and concert hall",
          imageId: 447,
          tags: ["architecture", "romantic", "photo"],
        },
        {
          text: "Rooftop Bar Pre-Dinner Drinks",
          description:
            "Enjoy cocktails with panoramic views at Klunkerkranich or Monkey Bar before dinner",
          imageId: 698,
          tags: ["drinks", "views", "trendy"],
        },
      ],
    },
    {
      day: 1,
      startTime: "19:30",
      endTime: "22:00",
      category: "dinner",
      options: [
        {
          text: "Fine Dining at Tim Raue (Michelin Star)",
          description:
            "Asian-inspired haute cuisine by one of Germany's most acclaimed chefs. Advance booking essential",
          imageId: 262,
          tags: ["fine-dining", "michelin", "premium"],
        },
        {
          text: "Kreuzberg Turkish Cuisine",
          description:
            "Authentic mezze, kebabs, and baklava in Berlin's vibrant Turkish district with lively atmosphere",
          imageId: 374,
          tags: ["ethnic", "authentic", "lively"],
        },
        {
          text: "Traditional Beer Garden Dinner",
          description:
            "Local brews and hearty German dishes in a classic outdoor beer garden with communal tables",
          imageId: 541,
          tags: ["traditional", "beer", "social"],
        },
        {
          text: "Friedrichshain Restaurant Scene",
          description:
            "Explore trendy area with diverse options from vegan restaurants to innovative fusion cuisine",
          imageId: 188,
          tags: ["trendy", "diverse", "young"],
        },
      ],
    }
  );

  // Day 2 - Culture & History
  data.push(
    {
      day: 2,
      startTime: "08:00",
      endTime: "09:30",
      category: "breakfast",
      options: [
        {
          text: "Breakfast at Sony Center",
          description:
            "Modern food court with international options under the iconic tent-like glass roof",
          imageId: 628,
          tags: ["modern", "variety", "architectural"],
        },
        {
          text: "Historic Nikolaiviertel Café",
          description:
            "Charming medieval quarter breakfast in Berlin's oldest neighborhood with cobblestone streets",
          imageId: 456,
          tags: ["historic", "charming", "traditional"],
        },
        {
          text: "Veganz - All Vegan Breakfast",
          description:
            "Plant-based paradise with creative vegan breakfasts, smoothie bowls, and specialty coffee",
          imageId: 764,
          tags: ["vegan", "healthy", "modern"],
        },
        {
          text: "Hotel Breakfast & Tiergarten Morning Walk",
          description:
            "Relax at your hotel then take a peaceful morning stroll through the park before the day begins",
          imageId: 502,
          tags: ["relaxed", "nature", "peaceful"],
        },
      ],
    },
    {
      day: 2,
      startTime: "09:30",
      endTime: "13:00",
      category: "culture",
      options: [
        {
          text: "Holocaust Memorial & Jewish Museum",
          description:
            "Powerful memorial experience followed by comprehensive history at Europe's largest Jewish museum",
          imageId: 21,
          tags: ["memorial", "educational", "important"],
        },
        {
          text: "Checkpoint Charlie & Cold War Sites",
          description:
            "Visit the famous crossing point, see remnants of the Wall, and explore Cold War espionage stories",
          imageId: 165,
          tags: ["history", "cold-war", "iconic"],
        },
        {
          text: "Charlottenburg Palace & Gardens",
          description:
            "Berlin's largest palace with baroque gardens, royal apartments, and impressive porcelain collection",
          imageId: 433,
          tags: ["palace", "gardens", "baroque"],
        },
        {
          text: "DDR Museum Interactive Experience",
          description:
            "Hands-on museum where you can sit in a Trabant, explore East German apartments, and more",
          imageId: 589,
          tags: ["interactive", "fun", "educational"],
        },
      ],
    },
    {
      day: 2,
      startTime: "13:00",
      endTime: "14:30",
      category: "lunch",
      options: [
        {
          text: "Lunch at Hackescher Markt",
          description:
            "Trendy area with countless options from Asian fusion to Italian trattorias and German classics",
          imageId: 217,
          tags: ["trendy", "variety", "central"],
        },
        {
          text: "Döner Kebab at Mustafa's Gemüse Kebap",
          description:
            "Famous queue-worthy veggie kebab that locals and tourists agree is Berlin's best",
          imageId: 845,
          tags: ["iconic", "street-food", "authentic"],
        },
        {
          text: "KaDeWe Food Hall",
          description:
            "Legendary department store's 6th-floor gourmet paradise with international delicacies",
          imageId: 392,
          tags: ["gourmet", "luxury", "variety"],
        },
        {
          text: "Vietnamese in Mitte",
          description:
            "Fresh pho and banh mi in Berlin's vibrant Vietnamese community near Rosenthaler Platz",
          imageId: 279,
          tags: ["asian", "fresh", "budget"],
        },
      ],
    },
    {
      day: 2,
      startTime: "14:30",
      endTime: "18:00",
      category: "activity",
      options: [
        {
          text: "Topography of Terror Exhibition",
          description:
            "Nazi terror documentation center on the former Gestapo headquarters site. Free admission",
          imageId: 673,
          tags: ["history", "free", "educational"],
        },
        {
          text: "Bike Tour Through Berlin",
          description:
            "Guided cycling tour covering major sights, hidden gems, and local neighborhoods at a relaxed pace",
          imageId: 743,
          tags: ["active", "comprehensive", "fun"],
        },
        {
          text: "Alternative Berlin Street Art Tour",
          description:
            "Explore RAW-Gelände, see graffiti culture, and discover underground art scene in Friedrichshain",
          imageId: 815,
          tags: ["art", "alternative", "trendy"],
        },
        {
          text: "Shopping on Kurfürstendamm",
          description:
            "Berlin's Champs-Élysées with luxury boutiques, flagship stores, and the iconic Kaiser Wilhelm Church",
          imageId: 501,
          tags: ["shopping", "luxury", "elegant"],
        },
      ],
    }
  );

  // Day 3 - Experience & Departure
  if (days >= 3) {
    data.push(
      {
        day: 3,
        startTime: "08:00",
        endTime: "10:00",
        category: "breakfast",
        options: [
          {
            text: "Farmers Market Breakfast at Winterfeldtmarkt",
            description:
              "Fresh produce, artisan breads, local cheeses, and coffee at Berlin's best Saturday market",
            imageId: 876,
            tags: ["market", "fresh", "local"],
          },
          {
            text: "Spätzle & Knödel Brunch",
            description:
              "Traditional South German breakfast specialties at a cozy Bavarian-style restaurant",
            imageId: 423,
            tags: ["traditional", "hearty", "cozy"],
          },
          {
            text: "Breakfast Boat on Spree River",
            description: "Unique breakfast cruise combining sightseeing with your morning meal",
            imageId: 612,
            tags: ["unique", "scenic", "memorable"],
          },
          {
            text: "Final Hotel Breakfast & Packing",
            description: "Relax at your hotel, enjoy breakfast, and prepare for departure",
            imageId: 203,
            tags: ["relaxed", "practical", "easy"],
          },
        ],
      },
      {
        day: 3,
        startTime: "10:00",
        endTime: "13:00",
        category: "activity",
        options: [
          {
            text: "Sachsenhausen Concentration Camp Memorial",
            description:
              "Important half-day visit to memorial site just outside Berlin. Moving and educational experience",
            imageId: 89,
            tags: ["memorial", "important", "sobering"],
          },
          {
            text: "Potsdam & Sanssouci Palace Day Trip",
            description:
              "Visit Frederick the Great's summer palace and UNESCO gardens in neighboring Potsdam",
            imageId: 572,
            tags: ["palace", "gardens", "unesco"],
          },
          {
            text: "Final Museum Visit & Souvenir Shopping",
            description:
              "Revisit favorite spots or explore remaining museums, then shop for Berlin souvenirs",
            imageId: 334,
            tags: ["flexible", "shopping", "museums"],
          },
          {
            text: "Mauerpark Flea Market & Karaoke",
            description:
              "Sunday market with vintage finds, street food, and famous open-air karaoke sessions",
            imageId: 942,
            tags: ["market", "fun", "unique"],
          },
        ],
      },
      {
        day: 3,
        startTime: "13:00",
        endTime: "15:00",
        category: "lunch",
        options: [
          {
            text: "Farewell Lunch at Nobelhart & Schmutzig",
            description:
              "Michelin-starred 'brutally local' cuisine using only Berlin-Brandenburg ingredients",
            imageId: 478,
            tags: ["michelin", "local", "memorable"],
          },
          {
            text: "Street Food Thursday at Markthalle Neun",
            description:
              "If it's Thursday, enjoy the legendary street food market with global vendors",
            imageId: 756,
            tags: ["street-food", "variety", "fun"],
          },
          {
            text: "Quick Lunch Near Airport",
            description: "Convenient meal close to transportation hub for smooth departure",
            imageId: 189,
            tags: ["convenient", "quick", "practical"],
          },
          {
            text: "Picnic in Tiergarten",
            description: "Grab takeaway and enjoy final moments in Berlin's beautiful urban park",
            imageId: 821,
            tags: ["outdoor", "relaxed", "scenic"],
          },
        ],
      }
    );
  }

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 300));
  return data;
}

// Mock: send selection to server
export async function mockSubmitSelection(
  questionIndex: number,
  option: Option,
  meta?: { day: number; startTime: string; endTime: string }
): Promise<void> {
  await new Promise((r) => setTimeout(r, 120));
  if (meta) {
    console.log(
      `[Question ${questionIndex + 1}] (Day ${meta.day} ${meta.startTime}-${meta.endTime}) Selected:`,
      option.text
    );
  } else {
    console.log(`[Question ${questionIndex + 1}] Selected:`, option.text);
  }
}

// Mock: print full selection contents to console
export async function mockLogSelectionContents(
  questionIndex: number,
  option: Option,
  meta?: { day: number; startTime: string; endTime: string }
): Promise<void> {
  console.log("Selection contents:", {
    question: questionIndex + 1,
    meta,
    option,
  });
}
