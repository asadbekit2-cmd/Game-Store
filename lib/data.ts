export interface Review {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Game {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    category: string;
    tags: string[];
    isNew?: boolean;
    isTrending?: boolean;
    screenshots: string[];
    reviews: Review[];
}

export const games: Game[] = [
    {
        id: "1",
        title: "Neon Nights: Uprising",
        description: "Lead the rebellion in a neon-soaked metropolis controlled by mega-corporations. Hack, fight, and survive in the most immersive cyberpunk open world ever created. Customize your character with cybernetic enhancements and choose your path in a branching narrative where every choice matters.",
        price: 59.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070",
        category: "Action RPG",
        tags: ["Cyberpunk", "Open World", "Sci-Fi"],
        isTrending: true,
        screenshots: [
            "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2071"
        ],
        reviews: [
            {
                id: "r1",
                user: "CyberNinja99",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja99",
                rating: 5,
                comment: "The visuals are absolutely stunning. Best cyberpunk game I've played in years!",
                date: "2077-11-15"
            },
            {
                id: "r2",
                user: "NeonDrifter",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NeonDrifter",
                rating: 4,
                comment: "Great story, but a few bugs here and there. Still highly recommended.",
                date: "2077-11-12"
            }
        ]
    },
    {
        id: "2",
        title: "Cyber Soul",
        description: "Hack into the mainframe and discover the secrets of digital immortality. A narrative-driven adventure that questions what it means to be human in a world where consciousness can be uploaded.",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070",
        category: "Adventure",
        tags: ["Hacking", "Story Rich", "Atmospheric"],
        isNew: true,
        screenshots: [
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
        ],
        reviews: [
            {
                id: "r1",
                user: "DataMiner",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DataMiner",
                rating: 5,
                comment: "Mind-bending story. I couldn't put it down.",
                date: "2077-10-30"
            }
        ]
    },
    {
        id: "3",
        title: "Mech Warrior: Arena",
        description: "Customize your mech and battle for glory in the underground arenas. Fast-paced combat with deep customization options for your war machine.",
        price: 29.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=2070",
        category: "Action",
        tags: ["Mechs", "Multiplayer", "Combat"],
        isTrending: true,
        screenshots: [
            "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2070"
        ],
        reviews: []
    },
    {
        id: "4",
        title: "Void Drifter",
        description: "Explore the vast emptiness of space in your custom starship. A relaxing simulation game about discovery and survival in the cosmos.",
        price: 39.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2070",
        category: "Simulation",
        tags: ["Space", "Exploration", "Relaxing"],
        screenshots: [
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072"
        ],
        reviews: []
    },
    {
        id: "5",
        title: "Synthwave Racer",
        description: "High-speed racing through retro-futuristic landscapes. Pump up the volume with an original synthwave soundtrack.",
        price: 19.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=2070",
        category: "Racing",
        tags: ["Retro", "Music", "Fast-Paced"],
        isNew: true,
        screenshots: [
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2070"
        ],
        reviews: []
    },
    {
        id: "6",
        title: "Data Heist 2099",
        description: "Assemble your crew and pull off the ultimate digital heist. A tactical strategy game where planning is everything.",
        price: 44.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070",
        category: "Strategy",
        tags: ["Stealth", "Tactical", "Co-op"],
        screenshots: [
            "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2070"
        ],
        reviews: []
    },
];
