window.SITE_TEMPLATE_VARS = {
    Name: "Dheeraj Karki",
    Current_Role: "Arden Software",
    Affiliation: "University of Bristol",
    About_Intro: "I am currently a Staff Software Developer working on CAD systems, with an active transition toward Robotics and AI research through the MS Robotics programme at the University of Bristol.",
    About_Background: "My background is in software engineering, with a focus on CAD systems, computational geometry, spatial data structures, and high-performance algorithm design. I am now extending this foundation into research-oriented work in reinforcement learning, graph machine learning, and decision systems for robotics.",
    About_Collaboration: "If you are interested in discussing collaboration opportunities or shared technical interests, please connect with me on LinkedIn.",
    Current_Position_Detail: "Staff Software Developer at Arden Software",
    Academic_Direction: "MS Robotics (University of Bristol), RL, graph ML, perception",
    Near_Term_Goal: "research-grade project outputs, writing, and collaboration",
    LinkedIn_URL: "https://www.linkedin.com/in/dheeraj-karki-982b2756",
    GitHub_URL: "https://github.com/karkid",
    CV_URL: "../Profile.pdf",
    Email: "dheerajkarki1790@gmail.com",
    Year: "2026",
    default_theme: "dark",

    // Projects
    project_intro: "Here are some of the projects I have worked on, which reflect my interests in software development, machine learning, and research. I am always open to new opportunities and collaborations, so feel free to reach out if you want to discuss any of these projects or potential ideas.",
    projects: [
        {
            title: "Epistemic FactKG",
            description: "A knowledge graph generation and claim validation framework for epistemic fact checking. This project processes structured data from AI2-THOR simulations and AVERITEC datasets to build RDF knowledge graphs and generate verifiable claims with epistemic labels.",
            link: "https://github.com/karkid/epistemic-factkg",
            Repo: "Private",
            owner: "Dheeraj Karki",
            status: "In Progress",
            timeline: "February 2026 - Ongoing",
            technology: "Python",
            domain: "Explainable AI, Knowledge Graphs, Fact Checking",
            tags: ["Research", "Git"],
            pinned: true,
            purpose: "Working on the Research draft to validate the affect of the epistemic lables on the claim validation process. The goal is to contribute to the field of Explainable AI using GNNs, so the machine learning models can provide more transparent and interpretable outputs, especially in the context of fact checking and knowledge graph generation."
        },
        {
            title: "ReML — Rebuilding Machine Learning from Scratch",
            description: "The goal is to deeply understand how these libraries work internally by rebuilding their components step by step, testing them against the real implementations, and documenting the learning process.",
            link: "https://github.com/karkid/ReML",
            status: "In Progress",
            Repo: "Public",
            owner: "Dheeraj Karki",
            timeline: "April 2024 - Ongoing",
            technology: "Python",
            tags: ["Exploration", "Git"],
            domain: "Machine Learning, Deep Learning, Library Development",
            pinned: true,
            purpose: "I started this project to gain a deeper understanding of how machine learning libraries like PyTorch and TensorFlow work under the hood. By rebuilding their components from scratch, I aim to learn about the underlying algorithms, data structures, and design patterns that make these libraries efficient and powerful. This project is a great way for me to solidify my knowledge of machine learning concepts and improve my programming skills."
        },
        {
            title: "PDDL Planner",
            description: "A collection of PDDL domains and problem files for experimenting with automated planning and AI planning techniques.",
            link: "https://github.com/karkid/PDDL",
            status: "Completed",
            Repo: "Public",
            owner: "Dheeraj Karki",
            timeline: "August 2025 - August 2025",
            technology: "PDDL",
            domain: "Automated Planning, AI Planning",
            tags: ["Exploration", "Git"],
            pinned: true,
            purpose: "I created this project to explore automated planning and AI planning techniques using the Planning Domain Definition Language (PDDL). It was a fun project to work on and I learned a lot about planning algorithms and how to represent planning problems using PDDL."
        },
        {
            title: "CAD in Cloud",
            description: "The idea here is to implement a CAD rendering engine on cloud to support and achieve the functionality of 'Anyplace, Anywhere and Anytime'. We use DXF drawing for this project.",
            link: "https://github.com/karkid/CADInColud",
            status: "Completed",
            Repo: "Public",
            owner: "Dheeraj Karki",
            timeline: "July 2018 - September 2026",
            technology: "C++",
            domain: "CAD, Cloud Computing",
            tags: ["Research", "Git"],
            pinned: false,
            purpose: "Build for the Master thesis project, the idea was to implement a CAD rendering engine on cloud to support and achieve the functionality of 'Anyplace, Anywhere and Anytime'. We use DXF drawing for this project. It was a great learning experience for me and I enjoyed building it."
        },
        {
            title: "Shape War",
            description: "It is the game build on Entity Component System paradigm.",
            link: "https://github.com/karkid/Shape_War",
            status: "Completed",
            Repo: "Public",
            owner: "Dheeraj Karki",
            timeline: "March 2024 - March 2024",
            technology: "C++",
            domain: "Game Development, C++ Programming",
            tags: ["Exploration", "Git"],
            pinned: false,
            purpose: "I wanted to learn about Entity Component System (ECS) architecture and I thought building a simple game would be a fun way to do that. Shape War is a simple game where players control a shape and try to defeat other shapes by shooting them. It was a great learning experience for me and I enjoyed building it."
        },
        {
            title: "Air BNB exploratory analysis",
            description: "Exploratory data analysis of Air BNB listings in London, UK, using Python and Jupyter Notebook.",
            link: "https://github.com/karkid/exploratory-analysis/",
            status: "Completed",
            Repo: "Public",
            owner: "Dheeraj Karki",
            timeline: "June 2023 - July 2023",
            technology: "Python",
            domain: "Data Analysis, Machine Learning",
            tags: ["Exploration", "Git"],
            pinned: false,
            purpose: "Learning ML through exploratory data analysis of Air BNB listings in London, UK, using Python and Jupyter Notebook."
        },
        {
            title: "Frido",
            description: "Frido, a todo app with a focus on simplicity and user experience, built using React and Firebase.",
            link: "https://frido.app/",
            status: "Active",
            Repo: "Private",
            owner: "Dheeraj Karki",
            timeline: "August 2019 - February 2026",
            technology: "React, Firebase",
            domain: "Web Development, Productivity Tools",
            tags: ["Volunteer", "Startup", "Git"],
            pinned: false,
            purpose: "Frido is volunteer project that Madsen and I started in 2019. We wanted to create a simple and intuitive todo app that would help people stay organized and productive. We built it using React for the frontend and Firebase for the backend, and we have been continuously improving it based on user feedback. Frido has been a great learning experience for us and we are proud of the product we have created."
        },
        {
            title: "Carbon",
            description: "Building a rendering engine from scratch in C++ using OpenGL.",
            technology: "C++",
            link: "https://github.com/karkid/Carbon_Old",
            timeline: "July 2019 - September 2019",
            status: "Discontinued",
            Repo: "Public",
            owner: "Dheeraj Karki",
            technology: "C++",
            domain: "Graphics Programming, Rendering Engines",
            tags: ["Exploration", "Git"],
            pinned: false,
            purpose: "I had a great interest in learning how rendering engines work and I wanted to build one from scratch. It was a fun project to work on and I learned a lot about graphics programming and OpenGL."
        },
        {
            title: "Tic-Tac-Toe",
            description: "Tic-Tac-Toe is board gamefor two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.",
            technology: "C++",
            link: "https://github.com/karkid/Tic-Tac-Toe",
            timeline: "December 2018 - December 2018",
            status: "Completed",
            Repo: "Public",
            owner: "Dheeraj Karki",
            tags: ["Exploration", "Git"],
            pinned: false,
            domain: "Game Development, C++ Programming",
            purpose: "I had created similar project in my first year of bachelor degree in C. I got chance to recreate it for an interview process in C++. It was a fun project to work and I remember it as Hello World of C++ for me."
        },
        {
            title: "Lens 2D Render Engine",
            description: "Improving the rendering pipeline and architecture of a 2D engine to enhance performance and visual quality.",
            link: "",
            presentation_link: "../resources/docs/talks/Lens%202D%20Render%20Engine.pdf",
            Repo: "Private",
            status: "Completed",
            timeline: "November 2019 - July 2020",
            technology: "JavaScript, WebGL",
            domain: "Graphics, Rendering, JavaScript",
            tags: ["Research", "Office"],
            pinned: true,
            owner: "Arden Software",
            purpose: "Enhancing the 2D rendering engine to improve performance and visual quality for internal projects."
        },
        {
            title: "Cimex Importer",
            description: "Designing and implementing an importer for the Cimex CAD format, including handling geometry, metadata, and integration with existing CAD systems.",
            link: "",
            presentation_link: "../resources/docs/talks/Cimex_Importer.pdf",
            Repo: "Private",
            status: "Completed",
            timeline: "September 2021 - October 2021",
            technology: "C++",
            domain: "CAD, Interoperability, Data Exchange",
            tags: ["Research", "Office"],
            pinned: true,
            owner: "Arden Software",
            purpose: "Reverse engineering the Cimex CAD format to build an importer that can handle geometry, metadata, and integrate with existing CAD systems. This project is important for improving interoperability and data exchange in CAD workflows."
        },
        {
            title: "Viewport React Component",
            summary: "Presentation on building and structuring viewport-driven UI components.",
            link: "",
            presentation_link: "../resources/docs/talks/ViewportReactComponent.pdf",
            Repo: "Private",
            status: "Completed",
            timeline: "November 2025 - November 2025",
            technology: "React, JavaScript, C++",
            domain: "Frontend Development, UI Components",
            tags: ["Research", "Office"],
            pinned: true,
            owner: "Arden Software",
            purpose: "Designing a viewport react component which will be same for native and web. The goal is to have a single component that can be used across different platforms, improving code reuse and consistency in the user interface. This project is important for streamlining development and providing a seamless experience for users across native and web applications."
        }
    ],

    // Talks & Blogs
    blogs_intro: "Here are some of my recent talks, session presentations, and blog posts, which reflect my interests in machine learning, AI research, and software development. I enjoy sharing my insights and experiences through writing and speaking, and I hope these posts provide value to others in the field. If you have any questions or want to discuss any of these topics further, please feel free to reach out.",
    blogs: [
        {
            title: "SOLID",
            summary: "Session slides on SOLID principles for maintainable object-oriented design.",
            link: "../resources/docs/talks/SOLID.pdf",
            date: "May 6, 2019",
            tags: ["Design", "OOP", "Architecture"],
            timeToRead: "75 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "In-Person",
            location: "Gräbert GmbH"
        },
        {
            title: "Flash Cards",
            summary: "Presentation deck used for quick concept reviews and knowledge sharing sessions.",
            link: "../resources/docs/talks/Flash-Cards.pdf",
            date: "March 31, 2024",
            tags: ["Learning", "Workshop"],
            timeToRead: "9 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Meeting Talk",
            file_type: "pptx",
            mode: "Online",
            location: "iSpeak"
        },
        {
            title: "Statistics",
            summary: "Talk slides covering practical statistics concepts for engineering and analysis.",
            link: "../resources/docs/talks/Statistics.pdf",
            date: "April 4, 2024",
            tags: ["Statistics", "Data"],
            timeToRead: "42 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "In-Person",
            location: "Arden Software"
        },
        {
            title: "Cimex Importer",
            summary: "Technical session deck discussing importer design and integration details.",
            link: "../resources/docs/talks/Cimex_Importer.pdf",
            date: "March 17, 2024",
            tags: ["CAD", "Import", "Engineering"],
            timeToRead: "18 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "Online",
            location: "Arden Software"
        },
        {
            title: "Viewport React Component",
            summary: "Presentation on building and structuring viewport-driven UI components.",
            link: "../resources/docs/talks/ViewportReactComponent.pdf",
            date: "September 24, 2025",
            tags: ["React", "Frontend", "UI"],
            timeToRead: "9 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "Online",
            location: "Arden Software"
        },
        {
            title: "Lens 2D Render Engine",
            summary: "Talk material explaining architecture and rendering flow for a 2D engine.",
            link: "../resources/docs/talks/Lens%202D%20Render%20Engine.pdf",
            date: "April 25, 2024",
            tags: ["Graphics", "Rendering", "C++"],
            timeToRead: "21 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "Online",
            location: "Arden Software"
        },
        {
            title: "Design Pattern: Decorative And Composite",
            summary: "Slides focused on Decorator and Composite patterns with practical examples.",
            link: "../resources/docs/talks/Design%20Pattern_%20DecorativeAndComposite.pdf",
            date: "May 7, 2019",
            tags: ["Design Patterns", "Software Design"],
            timeToRead: "12 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "In-Person",
            location: "Gräbert GmbH"
        },
        {
            title: "Basics of Computer Graphics and Its Importance",
            summary: "Introductory presentation covering graphics fundamentals and real-world relevance.",
            link: "../resources/docs/talks/Basics%20of%20Computer%20Grapics%20and%20Its%20Importance.pdf",
            date: "April 4, 2019",
            tags: ["Computer Graphics", "Fundamentals"],
            timeToRead: "31 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "In-Person",
            location: "Gräbert GmbH"
        },
        {
            title: "Talk about Dimension Unit",
            summary: "Session notes and slides on dimension/unit handling in design workflows.",
            link: "../resources/docs/talks/ON-TalkaboutDimensionUnit-070219-0452.pdf",
            date: "May 6, 2019",
            tags: ["CAD", "Dimensions", "Units"],
            timeToRead: "4 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pdf",
            mode: "In-Person",
            location: "Gräbert GmbH"
        },
        {
            title: "Philosophy behind OdRxObject",
            summary: "Technical presentation discussing architecture decisions around OdRxObject.",
            link: "../resources/docs/talks/Philosophy%20behind%20OdRxObject.pptx.pdf",
            date: "December 27, 2018",
            tags: ["CAD", "Architecture", "C++"],
            timeToRead: "36 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "In-Person",
            location: "Gräbert GmbH"
        },
        {
            title: "Let's Discover Coding in Life",
            summary: "Community-style talk encouraging coding through everyday problem solving.",
            link: "../resources/docs/talks/Let%E2%80%99s%20discover%20coding%20in%20life.pdf",
            date: "December 10, 2023",
            tags: ["Coding", "Community", "Learning"],
            timeToRead: "15 min read",
            featured: false,
            author: "Dheeraj Karki",
            status: "Presented",
            type: "talk",
            event: "Session Talk",
            file_type: "pptx",
            mode: "Online",
            location: "Arden Software"
        },
    ],

    // Journey
    journey_intro: "Here is my journey so far, which yet not ended. I am still learning and exploring new things.",
    journey: [
        {
            year: "2025-",
            icon: "ion-ios-cog",
            location: "At University of Bristol, UK",
            event: "Planning an MS in Robotics, focusing on reinforcement learning and graph machine learning for robotics applications and transitioning into research.",
            outcome: "Not yet started",
            reward: "Not yet achieved"
        },
        {
            year: "2016-2018",
            icon: "ion-ios-book",
            location: "At BITS Pilani University, India",
            event: "Pursued a Master's degree in Software Systems. ",
            outcome: "This education provided me with the technical knowledge and critical thinking abilities that have been essential in my career development.",
            reward: "Graduated with a CGPA of 8.6/10, earning accreditation for academic excellence."
        },
        {
            year: "2013-2025",
            icon: "ion-ios-briefcase",
            location: "At Corporate, India",
            event: "Pursued my dream of working in the industry, starting as a software developer and progressing to a staff role.",
            outcome: "This experience provided me with the technical knowledge and critical thinking abilities that have been essential in my career development.",
            reward: "Achieved significant milestones in my career, contributing to successful projects and team growth."
        },
        {
            year: "2008-2012",
            icon: "ion-ios-book-outline",
            location: "At ICFAI University Dehradun, Uttarakhand, India",
            event: "Pursued a Bachelor's degree in Electronics and Communication Engineering.",
            outcome: "This education provided me with the technical knowledge and critical thinking abilities that have been essential in my career development.",
            reward: "Scored 9.42/10 CGPA in my Bachelor's degree, earning a silver medal 🥈 and graduating with honors."
        },
        {
            year: "2005-2008",
            icon: "ion-ios-bookmarks",
            location: "At School Uttarakhand, India",
            event: "Started learning about the world through books, nature, and family stories.",
            outcome: "This early exposure to knowledge and curiosity laid the foundation for my lifelong passion for learning and discovery.",
            reward: "Scored 79.6% in Higher Secondary School and 76% in Secondary School with Physics, Chemistry, Biology and Mathematics."
        },
        {
            year: "1991-",
            icon: "ion-ios-home",
            location: "At Home Uttarakhand, India",
            event: "Born and raised in a small town in the foothills of the Himalayas.",
            outcome: "As a child, I learned moral values from my family and friends. Learning and exploring new things still going on. I am grateful for the opportunities and experiences that have shaped my journey so far, and I look forward to what the future holds.",
            reward: "Gratitude for the journey and excitement for the future."
        }
    ],

    // News
    news_intro: "Here are some of the recent news and updates related to my work and research. I am always excited to share my progress and insights, so feel free to reach out if you want to discuss any of these updates or related topics.",
    news: [
        {
            date: "2026-04-04",
            headline: "Launched my new portfolio page to better share my journey, projects, talks, and learning with everyone 🎉"
        },
        {
            date: "2026-02-10",
            headline: "Started the Epistemic FactKG research initiative to explore explainable fact verification using epistemic reasoning and knowledge-graph-based evidence modeling. 🔬",
            link: "https://github.com/karkid/epistemic-factkg"
        },
        {
            date: "2025-11-01",
            headline: "Completed the Viewport React Component initiative at Arden Software to improve cross-platform UI consistency, reuse, and maintainability across product workflows. ✅",
            link: "../resources/docs/talks/ViewportReactComponent.pdf"
        },
        {
            date: "2025-09-24",
            headline: "Presented a technical session on the Viewport React Component at Arden Software (Online), covering its architecture, implementation decisions, and integration approach for product teams. 🎤",
            link: "../resources/docs/talks/ViewportReactComponent.pdf"
        },
        {
            date: "2025-08-01",
            headline: "Completed IELTS in Aug 2025 with Listening 7.0, Reading 6.5, Writing 6.5, Speaking 6.5, Overall Band Score 6.5, and CEFR Level B2 🎉"
        },
        {
            date: "2025-08-15",
            headline: "Completed the PDDL Planner project to support automated planning experiments, domain modeling, and evaluation of planning workflows. ✅",
            link: "https://github.com/karkid/PDDL"
        },
        {
            date: "2025-01-10",
            headline: "Defined the MS Robotics academic direction at the University of Bristol, with a focus on reinforcement learning and graph machine learning for robotics research. 🎓"
        },
        {
            date: "2024-04-25",
            headline: "Delivered a technical presentation on the Lens 2D Render Engine at Arden Software (Online), explaining its design choices, rendering pipeline, and practical workflow usage. 🖥️",
            link: "../resources/docs/talks/Lens%202D%20Render%20Engine.pdf"
        },
        {
            date: "2024-04-04",
            headline: "Delivered a Statistics session at Arden Software (In-Person), focused on practical engineering analysis and connecting statistical concepts with real-world technical problem solving. 📊",
            link: "../resources/docs/talks/Statistics.pdf"
        },
        {
            date: "2024-03-31",
            headline: "Hosted a Flash Cards knowledge-sharing session at iSpeak (Online) to discuss learning techniques, structured revision, and practical knowledge retention strategies. 💡",
            link: "../resources/docs/talks/Flash-Cards.pdf"
        },
        {
            date: "2024-03-17",
            headline: "Presented the Cimex Importer design and CAD interoperability approach at Arden Software (Online), highlighting data flow, integration challenges, and implementation strategy. ⚙️",
            link: "../resources/docs/talks/Cimex_Importer.pdf"
        },
        {
            date: "2023-12-10",
            headline: "Delivered the 'Let's Discover Coding in Life' community session at Arden Software (Online) to make coding concepts more relatable, accessible, and relevant to everyday life. 🌟",
            link: "../resources/docs/talks/Let%E2%80%99s%20discover%20coding%20in%20life.pdf"
        },
        {
            date: "2019-05-07",
            headline: "Presented a Design Pattern session at Gräbert GmbH (In-Person), focused on Decorator and Composite patterns with emphasis on architectural thinking and practical software design use cases. 🧩",
            link: "../resources/docs/talks/Design%20Pattern_%20DecorativeAndComposite.pdf"
        },
        {
            date: "2019-05-06",
            headline: "Delivered a SOLID principles session at Gräbert GmbH (In-Person), focused on improving software design quality, maintainability, and engineering decision making. 🛠️",
            link: "../resources/docs/talks/SOLID.pdf"
        },
        {
            date: "2019-05-06",
            headline: "Delivered a Dimension Unit handling session at Gräbert GmbH (In-Person) to improve CAD consistency, measurement correctness, and workflow reliability. 📐",
            link: "../resources/docs/talks/ON-TalkaboutDimensionUnit-070219-0452.pdf"
        },
        {
            date: "2019-04-04",
            headline: "Presented a session at Gräbert GmbH (In-Person) on the basics of computer graphics, explaining core concepts and their practical importance in real engineering and software applications. 🎨",
            link: "../resources/docs/talks/Basics%20of%20Computer%20Grapics%20and%20Its%20Importance.pdf"
        },
        {
            date: "2018-12-27",
            headline: "Presented the 'Philosophy behind OdRxObject' session at Gräbert GmbH (In-Person) to explain the technical architecture, underlying design ideas, and practical significance of the object model. 🧠",
            link: "../resources/docs/talks/Philosophy%20behind%20OdRxObject.pptx.pdf"
        }
    ],
    // Publications
    publications_intro: "Here are some of my recent publications, which reflect my research interests in explainable AI, knowledge graphs, and fact checking. I am always open to discussing research ideas and potential collaborations, so feel free to reach out if you want to discuss any of these publications or related topics.",
    publications: [
        // {
        //     key: "kumar2026epistemic",
        //     author: "Kumar, Karthik and Smith, John",
        //     title: "Epistemic Labeling for Explainable Fact Verification",
        //     booktitle: "Proceedings of the Workshop on Explainable AI (XAI)",
        //     year: "2026",
        //     publisher: "ACM",
        //     pages: "12--18",
        //     doi: "10.1145/xxxxxxx.xxxxxxx",
        //     link: "https://example.com/publication-epistemic",
        //     type: "inproceedings"
        // },
        // {
        //     key: "kumar2025graph",
        //     author: "Kumar, Karthik",
        //     title: "Graph-Based Approaches for Claim Validation",
        //     journal: "International Journal of Machine Learning Applications",
        //     year: "2025",
        //     volume: "14",
        //     number: "3",
        //     pages: "201--215",
        //     doi: "10.1016/j.ijmla.2025.01.002",
        //     link: "https://example.com/publication-graph",
        //     type: "article"
        // }
    ]
};
