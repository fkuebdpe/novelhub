const STORAGE_KEY = 'novel_hub_settings';
const API_BASE = 'assets/data';

let novels = [];
let currentNovel = null;
let currentChapter = null;
let settings = {
    theme: 'light',
    fontSize: 18,
    lineHeight: 1.8,
    fontFamily: 'serif',
    pageWidth: 80
};

const fallbackNovels = [
    {
        "id": "rebirth-of-the-legendary-sword-master",
        "title": "Rebirth of the Legendary Sword Master",
        "author": "Wei Qian",
        "genre": "Fantasy",
        "status": "ongoing",
        "rating": "4.8",
        "views": 2500000,
        "cover": "https://picsum.photos/seed/swordmaster/300/400",
        "description": "After dying at the hands of his enemies, the legendary sword master Chen Fan is reborn back to his youth. Armed with the knowledge of his past life, he must now walk the path of cultivation again, this time with greater determination and wisdom. Follow his journey as he rises from a humble disciple to become the strongest swordsman in the world.",
        "updatedAt": "2024-01-20T08:00:00Z",
        "chapters": [
            { "id": "ch1", "number": 1, "title": "Rebirth", "wordCount": 3500, "updatedAt": "2024-01-01T08:00:00Z" },
            { "id": "ch2", "number": 2, "title": "The Path of Swords", "wordCount": 3200, "updatedAt": "2024-01-02T08:00:00Z" },
            { "id": "ch3", "number": 3, "title": "The Hidden Talent", "wordCount": 3500, "updatedAt": "2024-01-03T08:00:00Z" },
            { "id": "ch4", "number": 4, "title": "The Mysterious Old Man", "wordCount": 3400, "updatedAt": "2024-01-04T08:00:00Z" },
            { "id": "ch5", "number": 5, "title": "The Outer Sect Competition", "wordCount": 3600, "updatedAt": "2024-01-05T08:00:00Z" },
            { "id": "ch6", "number": 6, "title": "Entering the Inner Sect", "wordCount": 3300, "updatedAt": "2024-01-06T08:00:00Z" },
            { "id": "ch7", "number": 7, "title": "Inner Sect Rules", "wordCount": 3500, "updatedAt": "2024-01-07T08:00:00Z" },
            { "id": "ch8", "number": 8, "title": "The Heavenly Sword Art", "wordCount": 3400, "updatedAt": "2024-01-08T08:00:00Z" },
            { "id": "ch9", "number": 9, "title": "Lin Xue's Approach", "wordCount": 3200, "updatedAt": "2024-01-09T08:00:00Z" },
            { "id": "ch10", "number": 10, "title": "The Sect Crisis", "wordCount": 3700, "updatedAt": "2024-01-10T08:00:00Z" },
            { "id": "ch11", "number": 11, "title": "Border Battle", "wordCount": 3600, "updatedAt": "2024-01-11T08:00:00Z" },
            { "id": "ch12", "number": 12, "title": "Ancient Relic", "wordCount": 3500, "updatedAt": "2024-01-12T08:00:00Z" },
            { "id": "ch13", "number": 13, "title": "Back to the Sect", "wordCount": 3300, "updatedAt": "2024-01-13T08:00:00Z" },
            { "id": "ch14", "number": 14, "title": "Lin Xue's True Intentions", "wordCount": 3400, "updatedAt": "2024-01-14T08:00:00Z" },
            { "id": "ch15", "number": 15, "title": "The Cultivation Bottleneck", "wordCount": 3200, "updatedAt": "2024-01-15T08:00:00Z" },
            { "id": "ch16", "number": 16, "title": "The Sect Competition", "wordCount": 3800, "updatedAt": "2024-01-16T08:00:00Z" },
            { "id": "ch17", "number": 17, "title": "The Sect Master's Secret", "wordCount": 3300, "updatedAt": "2024-01-17T08:00:00Z" },
            { "id": "ch18", "number": 18, "title": "The Demonic Sect's Plot", "wordCount": 3500, "updatedAt": "2024-01-18T08:00:00Z" },
            { "id": "ch19", "number": 19, "title": "The Crisis", "wordCount": 3600, "updatedAt": "2024-01-19T08:00:00Z" },
            { "id": "ch20", "number": 20, "title": "The Truth Unveiled", "wordCount": 3400, "updatedAt": "2024-01-20T08:00:00Z" }
        ]
    },
    {
        "id": "the-emperors-concubine",
        "title": "The Emperor's Concubine",
        "author": "Ling Yue",
        "genre": "Romance",
        "status": "completed",
        "rating": "4.6",
        "views": 1800000,
        "cover": "https://picsum.photos/seed/emperorconcubine/300/400",
        "description": "In the treacherous world of the imperial harem, a young girl from a fallen noble family must navigate through schemes and intrigues to survive. She catches the eye of the emperor, but with that attention comes danger from jealous rivals. Will she find true love in the cold palace, or will she become another victim of power struggles?",
        "updatedAt": "2024-01-10T09:00:00Z",
        "chapters": [
            { "id": "tc1", "number": 1, "title": "Entering the Palace", "wordCount": 3000, "updatedAt": "2024-01-01T09:00:00Z" },
            { "id": "tc2", "number": 2, "title": "First Encounter", "wordCount": 3200, "updatedAt": "2024-01-02T09:00:00Z" },
            { "id": "tc3", "number": 3, "title": "Jealous Eyes", "wordCount": 2800, "updatedAt": "2024-01-03T09:00:00Z" },
            { "id": "tc4", "number": 4, "title": "The Empress", "wordCount": 3100, "updatedAt": "2024-01-04T09:00:00Z" },
            { "id": "tc5", "number": 5, "title": "A Secret Alliance", "wordCount": 2900, "updatedAt": "2024-01-05T09:00:00Z" },
            { "id": "tc6", "number": 6, "title": "The Emperor's Favor", "wordCount": 3300, "updatedAt": "2024-01-06T09:00:00Z" },
            { "id": "tc7", "number": 7, "title": "The Empress's Revenge", "wordCount": 3500, "updatedAt": "2024-01-07T09:00:00Z" },
            { "id": "tc8", "number": 8, "title": "The New Empress", "wordCount": 3400, "updatedAt": "2024-01-08T09:00:00Z" },
            { "id": "tc9", "number": 9, "title": "The Threat from the North", "wordCount": 3200, "updatedAt": "2024-01-09T09:00:00Z" },
            { "id": "tc10", "number": 10, "title": "The Final Battle", "wordCount": 3700, "updatedAt": "2024-01-10T09:00:00Z" }
        ]
    },
    {
        "id": "city-of-shadows",
        "title": "City of Shadows",
        "author": "Chen Mo",
        "genre": "Action",
        "status": "ongoing",
        "rating": "4.7",
        "views": 1200000,
        "cover": "https://picsum.photos/seed/cityshadows/300/400",
        "description": "In the bustling metropolis of Jiangcheng, there exists a hidden world of assassins, mercenaries, and secret organizations. Lin Hao, a former special forces operative, is drawn into this dark underworld after his sister's disappearance. With his combat skills and sharp instincts, he must uncover the truth behind her vanishing and confront the powerful forces that rule the city's shadows.",
        "updatedAt": "2024-01-10T10:00:00Z",
        "chapters": [
            { "id": "sc1", "number": 1, "title": "The Missing Sister", "wordCount": 3400, "updatedAt": "2024-01-01T10:00:00Z" },
            { "id": "sc2", "number": 2, "title": "Entering the Underworld", "wordCount": 3600, "updatedAt": "2024-01-02T10:00:00Z" },
            { "id": "sc3", "number": 3, "title": "First Kill", "wordCount": 3200, "updatedAt": "2024-01-03T10:00:00Z" },
            { "id": "sc4", "number": 4, "title": "The Truth", "wordCount": 3500, "updatedAt": "2024-01-04T10:00:00Z" },
            { "id": "sc5", "number": 5, "title": "The Counterattack", "wordCount": 3300, "updatedAt": "2024-01-05T10:00:00Z" },
            { "id": "sc6", "number": 6, "title": "The Shadow", "wordCount": 3600, "updatedAt": "2024-01-06T10:00:00Z" },
            { "id": "sc7", "number": 7, "title": "The Aftermath", "wordCount": 3400, "updatedAt": "2024-01-07T10:00:00Z" },
            { "id": "sc8", "number": 8, "title": "The Final Showdown", "wordCount": 3500, "updatedAt": "2024-01-08T10:00:00Z" },
            { "id": "sc9", "number": 9, "title": "New Beginnings", "wordCount": 3300, "updatedAt": "2024-01-09T10:00:00Z" },
            { "id": "sc10", "number": 10, "title": "The Future", "wordCount": 3700, "updatedAt": "2024-01-10T10:00:00Z" }
        ]
    },
    {
        "id": "journey-to-the-west-reborn",
        "title": "Journey to the West: Reborn",
        "author": "Wu Cheng'en Jr.",
        "genre": "Adventure",
        "status": "ongoing",
        "rating": "4.9",
        "views": 3200000,
        "cover": "https://picsum.photos/seed/journeywest/300/400",
        "description": "A modern man is mysteriously transported into the world of Journey to the West, becoming the legendary Monkey King, Sun Wukong. But this is not the story he remembers from the classic novel - the world is darker, more dangerous, and the path to enlightenment is fraught with greater challenges. With his modern knowledge and the Monkey King's powers, he must forge his own destiny in this mythical realm.",
        "updatedAt": "2024-01-10T11:00:00Z",
        "chapters": [
            { "id": "jc1", "number": 1, "title": "Rebirth as the Monkey King", "wordCount": 4000, "updatedAt": "2024-01-01T11:00:00Z" },
            { "id": "jc2", "number": 2, "title": "The Mountain of Flowers and Fruit", "wordCount": 3800, "updatedAt": "2024-01-02T11:00:00Z" },
            { "id": "jc3", "number": 3, "title": "The Golden Cudgel", "wordCount": 3500, "updatedAt": "2024-01-03T11:00:00Z" },
            { "id": "jc4", "number": 4, "title": "Heavenly Palace", "wordCount": 4200, "updatedAt": "2024-01-04T11:00:00Z" },
            { "id": "jc5", "number": 5, "title": "The Three Disciples", "wordCount": 3600, "updatedAt": "2024-01-05T11:00:00Z" },
            { "id": "jc6", "number": 6, "title": "The Demon King", "wordCount": 3700, "updatedAt": "2024-01-06T11:00:00Z" },
            { "id": "jc7", "number": 7, "title": "The Fire Mountain", "wordCount": 3500, "updatedAt": "2024-01-07T11:00:00Z" },
            { "id": "jc8", "number": 8, "title": "The Yellow Robe Monster", "wordCount": 3600, "updatedAt": "2024-01-08T11:00:00Z" },
            { "id": "jc9", "number": 9, "title": "The Spider Spirits", "wordCount": 3400, "updatedAt": "2024-01-09T11:00:00Z" },
            { "id": "jc10", "number": 10, "title": "The Western Paradise", "wordCount": 4000, "updatedAt": "2024-01-10T11:00:00Z" }
        ]
    },
    {
        "id": "my-cute-roommate",
        "title": "My Cute Roommate",
        "author": "Xiao Mi",
        "genre": "Comedy",
        "status": "completed",
        "rating": "4.5",
        "views": 900000,
        "cover": "https://picsum.photos/seed/cuteroommate/300/400",
        "description": "Lin Yu never expected that his new roommate would be such a handful - or so cute! From morning chaos to late-night snack raids, living with the energetic and quirky Su Xiaoxiao turns his ordinary life into a hilarious adventure. Follow their daily misadventures as they navigate college life, friendship, and maybe even a little romance.",
        "updatedAt": "2024-01-10T14:00:00Z",
        "chapters": [
            { "id": "mc1", "number": 1, "title": "The Unexpected Roommate", "wordCount": 2800, "updatedAt": "2024-01-01T14:00:00Z" },
            { "id": "mc2", "number": 2, "title": "Morning Chaos", "wordCount": 2600, "updatedAt": "2024-01-02T14:00:00Z" },
            { "id": "mc3", "number": 3, "title": "Midnight Snack Run", "wordCount": 2900, "updatedAt": "2024-01-03T14:00:00Z" },
            { "id": "mc4", "number": 4, "title": "The Rainy Day", "wordCount": 2700, "updatedAt": "2024-01-04T14:00:00Z" },
            { "id": "mc5", "number": 5, "title": "The Birthday", "wordCount": 2800, "updatedAt": "2024-01-05T14:00:00Z" },
            { "id": "mc6", "number": 6, "title": "The First Date", "wordCount": 2700, "updatedAt": "2024-01-06T14:00:00Z" },
            { "id": "mc7", "number": 7, "title": "The Argument", "wordCount": 2600, "updatedAt": "2024-01-07T14:00:00Z" },
            { "id": "mc8", "number": 8, "title": "The Christmas Party", "wordCount": 2800, "updatedAt": "2024-01-08T14:00:00Z" },
            { "id": "mc9", "number": 9, "title": "The Graduation", "wordCount": 2700, "updatedAt": "2024-01-09T14:00:00Z" },
            { "id": "mc10", "number": 10, "title": "The Future", "wordCount": 2900, "updatedAt": "2024-01-10T14:00:00Z" }
        ]
    },
    {
        "id": "dragon-prince",
        "title": "Dragon Prince",
        "author": "Long Wei",
        "genre": "Fantasy",
        "status": "ongoing",
        "rating": "4.7",
        "views": 1500000,
        "cover": "https://picsum.photos/seed/dragonprince/300/400",
        "description": "Born with the blood of ancient dragons, Prince Yan Long must hide his true nature from those who would fear or exploit him. When a dark force threatens his kingdom, he must embrace his heritage and unleash the power of the dragon within. Follow his journey as he discovers the truth about his lineage and fights to protect what he loves.",
        "updatedAt": "2024-01-10T12:00:00Z",
        "chapters": [
            { "id": "dc1", "number": 1, "title": "The Hidden Secret", "wordCount": 3300, "updatedAt": "2024-01-01T12:00:00Z" },
            { "id": "dc2", "number": 2, "title": "First Transformation", "wordCount": 3500, "updatedAt": "2024-01-02T12:00:00Z" },
            { "id": "dc3", "number": 3, "title": "The Threat", "wordCount": 3700, "updatedAt": "2024-01-03T12:00:00Z" },
            { "id": "dc4", "number": 4, "title": "The Dragon Council", "wordCount": 3400, "updatedAt": "2024-01-04T12:00:00Z" },
            { "id": "dc5", "number": 5, "title": "The Final Battle", "wordCount": 3600, "updatedAt": "2024-01-05T12:00:00Z" },
            { "id": "dc6", "number": 6, "title": "The New Era", "wordCount": 3500, "updatedAt": "2024-01-06T12:00:00Z" },
            { "id": "dc7", "number": 7, "title": "The Wedding", "wordCount": 3400, "updatedAt": "2024-01-07T12:00:00Z" },
            { "id": "dc8", "number": 8, "title": "The Heir", "wordCount": 3300, "updatedAt": "2024-01-08T12:00:00Z" },
            { "id": "dc9", "number": 9, "title": "The Dragon Festival", "wordCount": 3400, "updatedAt": "2024-01-09T12:00:00Z" },
            { "id": "dc10", "number": 10, "title": "The Legacy", "wordCount": 3700, "updatedAt": "2024-01-10T12:00:00Z" }
        ]
    }
];

const fallbackChapters = {
    "ch1": {
        "id": "ch1",
        "title": "Rebirth",
        "novelId": "rebirth-of-the-legendary-sword-master",
        "number": 1,
        "wordCount": 3500,
        "content": "The world spun around Chen Fan as he lay dying on the cold stone floor of the forbidden chamber. Blood trickled from the corner of his mouth, staining the ancient runes beneath him. His once-powerful body was now nothing but a shell, broken and empty.\n\n\"You thought you could defeat us, Chen Fan?\" A mocking voice echoed through the chamber. \"The Heavenly Sword Sect will never fall into the hands of a mere mortal.\"\n\nChen Fan's vision blurred as he recognized the voice - it was his own apprentice, Zhang Wei, the man he had raised from childhood. Beside him stood the sect master's daughter, Lin Xue, whose beautiful eyes now glinted with cold malice.\n\n\"Why...\" Chen Fan whispered, his voice barely audible.\n\n\"Why?\" Zhang Wei laughed, stepping over his fallen master. \"You were always too kind, too trusting. The world of cultivation is cruel - only the strong survive. Your position as the sect's greatest swordsman should have been mine long ago.\"\n\nLin Xue stepped forward, her delicate hand brushing Chen Fan's cheek. \"And you rejected me, Chen Fan. You chose your sword over love. Now you'll lose everything.\"\n\nAs darkness consumed him, Chen Fan's last thought was not of revenge, but of regret. He had spent his life chasing power, only to be betrayed by those closest to him. If he could do it all over again...\n\n***\n\nChen Fan jolted awake, gasping for air. Sunlight streamed through a narrow window, casting warm patterns on the rough wooden floor. The scent of aged wood and incense filled his nostrils.\n\n\"Where am I?\" he whispered.\n\nHe looked down at his hands - they were small, calloused, but definitely not the hands of a powerful sword master. These were the hands of a child.\n\nA voice interrupted his thoughts. \"Chen Fan! Are you awake? Master is waiting for you!\"\n\nThe door burst open, revealing a boy of about twelve with messy black hair and a grin on his face. It was Zhang Wei - but he was young, innocent, not the man who had betrayed him.\n\n\"Wei'er...\" Chen Fan stared.\n\n\"Hurry up!\" Zhang Wei grabbed his arm, pulling him out of bed. \"If we're late, Master will punish us with extra practice!\"\n\nAs they ran through the familiar corridors of the Heavenly Sword Sect, Chen Fan's mind raced. The stone walls, the ancient paintings, the sound of swords clashing in the training yard - everything was exactly as it had been thirty years ago.\n\nHe had been reborn. Back to the day he had first arrived at the sect, at the age of fourteen.\n\nThis time, things would be different.\n\nHe would not repeat the mistakes of his past life. He would not trust blindly. He would not let power corrupt him.\n\nAnd he would make sure that those who had betrayed him in his previous life would regret ever crossing paths with the legendary sword master - Chen Fan.",
        "updatedAt": "2024-01-01T08:00:00Z"
    },
    "ch2": {
        "id": "ch2",
        "title": "The Path of Swords",
        "novelId": "rebirth-of-the-legendary-sword-master",
        "number": 2,
        "wordCount": 3200,
        "content": "The training yard was bustling with activity when Chen Fan arrived. Young disciples sparred with wooden swords, their movements awkward but earnest. The air smelled of sweat and metal polish.\n\n\"There you are!\" A stern voice cut through the noise. Elder Li, the sect's chief instructor, stood before them, his white beard fluttering in the breeze. \"Thirty minutes late! Five hundred laps around the mountain for both of you!\"\n\nZhang Wei groaned, but Chen Fan merely nodded. In his past life, he would have complained about the punishment, but now he knew the value of discipline. Five hundred laps were nothing compared to the years of training that lay ahead.\n\nAs they ran, Chen Fan's mind wandered. In his previous life, he had been mediocre in his early years, only discovering his true talent for swordsmanship much later. But now, with the knowledge of a lifetime, he knew exactly what path to take.\n\nThe Heavenly Sword Sect was divided into three branches: the Inner Sect for elite disciples, the Outer Sect for regular students, and the Mortal Sect for those with limited potential. In his past life, Chen Fan had spent ten years in the Mortal Sect before finally breaking through.\n\nThis time, he would not waste a single day.\n\nAfter completing their laps, the disciples gathered for sword practice. Elder Li demonstrated a basic stance, his movements fluid and precise.\n\n\"Remember,\" he said, \"the sword is an extension of your body. Feel its weight, its balance. Let it become part of you.\"\n\nChen Fan watched closely, but instead of mimicking Elder Li's technique, he recalled the advanced sword forms he had mastered in his later years. The foundation was the same, but the execution...\n\nWhen it was his turn, he stepped forward and assumed a stance that was completely different from what Elder Li had taught. It was the beginning of the Heavenly Sword Technique, a form that only the sect master himself was supposed to know.\n\nThe other disciples stared, confused. Even Elder Li raised an eyebrow.\n\n\"What is this?\" Elder Li asked, his voice sharp. \"This is not the basic stance I taught you!\"\n\n\"Forgive me, Elder,\" Chen Fan said calmly. \"But this stance allows for greater flexibility and speed. Watch.\"\n\nHe drew his wooden sword and executed a simple slash. The movement was so fast that the other disciples could barely see the blade. When the sword stopped, there was a thin cut on the training dummy's chest - clean, precise, and much deeper than any of the other disciples' strikes.\n\nElder Li's eyes widened. \"Impossible... You've only been here a week, and you can already...\"\n\n\"I've been practicing,\" Chen Fan said with a faint smile.\n\nInside, he felt a surge of excitement. His body might be that of a fourteen-year-old, but his mind and soul were those of a legendary sword master. With this advantage, he would rise faster than anyone could imagine.\n\nThe path of swords stretched before him, and this time, he would walk it without hesitation.",
        "updatedAt": "2024-01-02T08:00:00Z"
    },
    "tc1": {
        "id": "tc1",
        "title": "Entering the Palace",
        "novelId": "the-emperors-concubine",
        "number": 1,
        "wordCount": 3000,
        "content": "The grand gates of the imperial palace loomed before Li Wei as she stepped out of the sedan chair. Her heart raced with a mix of fear and anticipation. Once a noble lady, she was now entering the palace as a mere concubine, her family's fate resting on her shoulders.\n\nThe palace walls seemed to stretch endlessly, adorned with intricate carvings of dragons and phoenixes. Servants scurried about, their heads bowed in deference to the imperial family.\n\n\"Miss Li,\" a eunuch said, bowing deeply. \"His Majesty awaits you in the Hall of Eternal Peace.\"\n\nLi Wei nodded, her hands trembling slightly as she followed the eunuch through the winding corridors. Every step felt like a journey into the unknown. She had heard tales of the palace - stories of beautiful concubines poisoned by jealous rivals, of secret alliances and deadly betrayals.\n\nAs they reached the hall, the eunuch announced her arrival. \"Presenting Lady Li Wei!\"\n\nThe doors opened, and Li Wei stepped inside. The room was vast, with a high ceiling painted with celestial scenes. At the far end, on a golden throne, sat the Emperor - a man in his late thirties with sharp features and eyes that seemed to see everything.\n\n\"Come closer,\" the Emperor said, his voice deep and commanding.\n\nLi Wei walked forward, her head lowered. She could feel his gaze upon her, weighing her up, judging her worth.\n\n\"You are Li Wei, daughter of the late General Li?\" the Emperor asked.\n\n\"Yes, Your Majesty,\" Li Wei replied, her voice steady despite her nerves.\n\n\"Your father was a brave man,\" the Emperor said. \"He died defending our borders from the northern barbarians. I will not let his sacrifice be forgotten.\"\n\nLi Wei's eyes filled with tears. \"Thank you, Your Majesty.\"\n\n\"But the court is not a place for sentiment,\" the Emperor continued, his tone hardening. \"Here, you must earn your place. Prove your worth, and you will be rewarded. Fail, and you will be cast aside.\"\n\n\"I understand, Your Majesty,\" Li Wei said, wiping away her tears.\n\nThe Emperor studied her for a moment longer, then nodded. \"You may retire to your quarters. The Empress will show you the ways of the palace.\"\n\nAs Li Wei left the hall, she knew that her life would never be the same again. The palace was a gilded cage, and she was just another bird trapped within its walls.\n\nBut Li Wei was not like other women. She had inherited her father's courage and determination. And she would not let anyone break her.\n\nThe game had begun, and she intended to win.",
        "updatedAt": "2024-01-01T09:00:00Z"
    },
    "sc1": {
        "id": "sc1",
        "title": "The Missing Sister",
        "novelId": "city-of-shadows",
        "number": 1,
        "wordCount": 3400,
        "content": "Lin Hao slammed the door to his apartment shut, his fists clenched in anger. The note on the table burned in his mind - his sister Lin Xue was gone, taken by someone or something he couldn't see.\n\n\"Xue'er...\" he whispered, staring at the empty chair where she usually sat. The apartment felt cold without her presence, without her laughter echoing through the rooms.\n\nThe note was simple, written in a messy hand: \"Your sister is with us. Come to the old warehouse at midnight if you want to see her again.\"\n\nNo signature, no explanation. But Lin Hao knew exactly who was behind this. The Shadows, a mysterious organization that controlled the underground of Jiangcheng. They dealt in drugs, weapons, and human trafficking - and now they had taken his sister.\n\nLin Hao was no stranger to violence. He had served in the special forces for eight years, rising to the rank of captain before an injury forced him to retire. His combat skills were still sharp, his instincts still deadly.\n\nBut this was personal. This was his sister.\n\nHe grabbed his jacket and a knife from the kitchen drawer, then headed out into the night. The streets of Jiangcheng were quiet at this hour, but Lin Hao knew that danger lurked around every corner.\n\nThe old warehouse was located in the industrial district, a derelict building surrounded by broken fences and overgrown weeds. As Lin Hao approached, he could see several shadowy figures standing guard at the entrance.\n\nHe took a deep breath and walked forward, his hands visible to show he wasn't armed - or at least, not obviously armed.\n\n\"Who are you?\" one of the guards asked, stepping forward.\n\n\"I'm here for my sister,\" Lin Hao said, his voice calm and steady.\n\nThe guard laughed. \"You're brave, coming here alone. But bravery won't save you.\"\n\nBefore Lin Hao could respond, the guard lunged at him with a knife. Lin Hao ducked, grabbing the man's wrist and twisting it. The knife clattered to the ground, and the guard screamed in pain.\n\nThe other guards reacted quickly, drawing their own weapons. But Lin Hao was faster. He moved through them like a shadow, his fists and feet striking with precision. Within seconds, all three guards were lying on the ground, unconscious.\n\nHe stepped inside the warehouse, his eyes adjusting to the darkness. The air smelled of rust and decay. In the center of the room, tied to a chair, was Lin Xue.\n\n\"Xue'er!\" Lin Hao ran toward her, but stopped when he saw the man standing behind her.\n\nHe was tall, with a scar running from his left eyebrow to his jawline. His eyes were cold, calculating.\n\n\"Captain Lin,\" the man said, smiling. \"I've been waiting for you.\"\n\n\"Who are you?\" Lin Hao asked.\n\n\"They call me the Viper,\" the man said. \"And I'm the one who took your sister.\"\n\n\"Why?\" Lin Hao demanded.\n\nThe Viper laughed. \"Because I want something from you, Captain. Your skills, your knowledge. You could be very useful to the Shadows.\"\n\n\"I'll never join you,\" Lin Hao said.\n\n\"Then your sister dies,\" the Viper said, drawing a gun and pressing it to Lin Xue's temple.\n\nLin Hao's mind raced. He needed to act fast. The Viper was standing about ten feet away, his attention focused on Lin Hao. If he moved quickly enough...\n\nWithout hesitation, Lin Hao lunged forward, throwing his knife at the Viper's hand. The blade struck true, embedding itself in the man's wrist. The gun fell to the ground.\n\nLin Hao tackled the Viper to the ground, his fists raining down on the man's face. The Viper struggled, but Lin Hao was stronger, more determined.\n\nWhen the Viper stopped moving, Lin Hao stood up and ran to his sister, cutting her free.\n\n\"Are you okay?\" he asked, checking her for injuries.\n\n\"I'm fine,\" Lin Xue said, tears streaming down her face. \"Thank you, Hao ge.\"\n\nAs they left the warehouse, Lin Hao knew that this was just the beginning. The Viper would not let this go. The Shadows would come for them.\n\nBut Lin Hao was ready. He had faced death many times before, and he would face it again to protect his sister.\n\nThe shadows of Jiangcheng would learn to fear the name Lin Hao.",
        "updatedAt": "2024-01-01T10:00:00Z"
    },
    "jc1": {
        "id": "jc1",
        "title": "Rebirth as the Monkey King",
        "novelId": "journey-to-the-west-reborn",
        "number": 1,
        "wordCount": 4000,
        "content": "Zhang Wei had been reading Journey to the West for the hundredth time when the world suddenly shifted.\n\nOne moment he was sitting in his apartment, surrounded by piles of books and empty coffee cups. The next, he found himself falling through a swirling vortex of colors, his screams echoing through the void.\n\nWhen he finally landed, it was with a painful thud on a bed of soft grass. He lay there for a moment, gasping for air, before slowly opening his eyes.\n\nThe world around him was nothing like he remembered. Towering trees reached toward a sky that seemed impossibly blue. Exotic birds flew overhead, their songs unfamiliar. And the air... it smelled of flowers and fresh earth, nothing like the polluted city he had left behind.\n\n\"What the...\" Zhang Wei muttered, pushing himself up.\n\nThat's when he noticed his hands. They were covered in golden fur, each finger tipped with sharp, curved claws. He stared at them in shock, then looked down at his body.\n\nHe was covered in fur. Golden fur.\n\n\"No... no, this can't be happening,\" Zhang Wei whispered.\n\nHe scrambled to his feet and ran to a nearby stream, staring at his reflection. What he saw made his blood run cold.\n\nIt was Sun Wukong. The Monkey King.\n\nThe legendary figure from Journey to the West, with his piercing golden eyes, his bushy eyebrows, and his powerful build. Zhang Wei had become the Monkey King.\n\n\"This is a dream,\" Zhang Wei said, pinching himself. \"I must be dreaming.\"\n\nBut the pain was real. The world was real.\n\nAs the shock began to fade, memories started flooding into Zhang Wei's mind - memories that weren't his own. Memories of a stone monkey born from the essence of heaven and earth. Memories of learning the art of immortality from the Patriarch Subhuti. Memories of causing havoc in the Heavenly Palace.\n\nAnd then... the Journey to the West. The quest to protect Tang Sanzang, the Buddhist monk, as he traveled to the Western Paradise to retrieve the sacred scriptures.\n\nZhang Wei had read the novel countless times, but now he was living it. And he knew that this journey would be far more dangerous than anything he had ever imagined.\n\nBut before he could even begin to process what had happened, he heard a voice.\n\n\"Great Sage! Great Sage!\"\n\nZhang Wei turned to see a group of monkeys running toward him, their faces filled with joy and relief.\n\n\"Great Sage, where have you been?\" one of them asked. \"We've been searching for you for days!\"\n\n\"I... I was...\" Zhang Wei stammered.\n\nHe realized he was on the Mountain of Flowers and Fruit, Sun Wukong's home. These were his subjects, the monkey tribe that had followed him since he first became their king.\n\n\"The Great Sage seems different today,\" one of the older monkeys whispered.\n\nZhang Wei took a deep breath. He needed to act like Sun Wukong. He needed to be the Monkey King.\n\n\"I have been meditating,\" he said, trying to sound authoritative. \"And I have received a vision from the heavens.\"\n\nThe monkeys looked at him expectantly.\n\n\"We are being called to a great quest,\" Zhang Wei continued. \"A journey to the west, to retrieve sacred scriptures that will bring enlightenment to all beings.\"\n\nThe monkeys murmured among themselves, but Zhang Wei could see the excitement in their eyes. They trusted him, believed in him.\n\nAnd as he looked at their faces, Zhang Wei felt a surge of determination. He might not be the real Sun Wukong, but he would honor his legacy.\n\nHe would protect these monkeys. He would fulfill the quest.\n\nAnd he would discover the truth about why he had been brought to this world.\n\nThe Journey to the West had begun.\n\nBut this time, it would be different.\n\nThis time, the Monkey King would be ready.",
        "updatedAt": "2024-01-01T11:00:00Z"
    },
    "mc1": {
        "id": "mc1",
        "title": "The Unexpected Roommate",
        "novelId": "my-cute-roommate",
        "number": 1,
        "wordCount": 2800,
        "content": "Lin Yu stood at the door of his new apartment, key in hand. He had just moved to the city for college and was looking forward to some peace and quiet. But as he opened the door, he was greeted by a scene he never expected.\n\nA girl with messy brown hair was sitting on his couch, eating a bowl of instant noodles while watching anime. She looked up at him with wide eyes, noodles hanging from her mouth.\n\n\"Oh! You must be the new roommate!\" she said, swallowing the noodles with a satisfied grin.\n\n\"Um... yeah,\" Lin Yu said, staring at her. \"And you are?\"\n\n\"Su Xiaoxiao!\" she said, jumping up and offering him a hand. \"Nice to meet you! I've been waiting for you for hours!\"\n\nLin Yu shook her hand, still trying to process what was happening. \"Waiting for me?\"\n\n\"Yeah! The landlord said you'd be here today, so I made sure to save you a spot on the couch!\" she said, pointing to the tiny corner of the couch that wasn't covered in her stuff.\n\nLin Yu looked around the apartment. It was small, but cozy. Or at least, it would be if it weren't for Su Xiaoxiao's belongings scattered everywhere - clothes, books, plush toys, and at least three empty noodle bowls.\n\n\"You've been living here alone?\" Lin Yu asked.\n\n\"Yep! For about a month,\" Su Xiaoxiao said. \"But the rent was too expensive, so I asked the landlord to find me a roommate. And here you are!\"\n\nLin Yu sighed. He had been hoping for a quiet, responsible roommate who would help keep the place clean. Instead, he got... this.\n\nBut Su Xiaoxiao seemed harmless enough, and she was already unpacking his boxes before he could say anything.\n\n\"Let me help you with those!\" she said, grabbing a box labeled \"Books\" and carrying it to the bedroom.\n\nLin Yu followed her, watching as she dumped the box on the floor and started arranging the books on the shelf - backwards.\n\n\"Uh, Xiaoxiao... the books go the other way,\" he said.\n\n\"Oh! Right!\" she said, laughing. \"I never was good at organization.\"\n\nBy the time they finished unpacking, it was getting dark. Su Xiaoxiao suggested they order pizza to celebrate their new living arrangement.\n\n\"I'll get the pepperoni!\" she said, already dialing the phone.\n\n\"I don't eat pepperoni,\" Lin Yu said.\n\n\"Too bad! Pepperoni is the best!\" she said, placing the order.\n\nLin Yu rolled his eyes, but he couldn't help but smile. Su Xiaoxiao was annoying, messy, and completely unpredictable - but she was also kind, energetic, and... kind of cute.\n\nAs they ate the pizza (Lin Yu picked off the pepperoni), Su Xiaoxiao told him about herself. She was a freshman majoring in art, loved anime and manga, and had a pet hamster named Mochi who was currently hiding under the couch.\n\n\"You have a hamster?\" Lin Yu asked.\n\n\"Yep! He's my best friend!\" Su Xiaoxiao said, calling the hamster over. A tiny ball of fur emerged from under the couch and climbed onto her lap.\n\nLin Yu stared at the hamster, then at Su Xiaoxiao. \"You're weird.\"\n\n\"I know!\" she said, grinning. \"But weird is fun!\"\n\nAs the night went on, Lin Yu found himself enjoying Su Xiaoxiao's company. She was chaotic, yes, but she also had a way of making even the most mundane things seem exciting.\n\nWhen it was time for bed, Su Xiaoxiao gave him a hug. \"Welcome to the apartment, Lin Yu! I'm so glad you're here!\"\n\nLin Yu froze, then awkwardly patted her back. \"Thanks... I guess.\"\n\nAs he lay in bed that night, Lin Yu couldn't help but wonder what he had gotten himself into. Living with Su Xiaoxiao was going to be... interesting.\n\nBut somehow, he had a feeling it would be the best decision he ever made.",
        "updatedAt": "2024-01-01T14:00:00Z"
    },
    "dc1": {
        "id": "dc1",
        "title": "The Hidden Secret",
        "novelId": "dragon-prince",
        "number": 1,
        "wordCount": 3300,
        "content": "Prince Yan Long paced restlessly in his chamber, his fingers brushing the golden scales that occasionally appeared on his arms. Since childhood, he had been warned never to reveal his secret - that he carried the blood of dragons in his veins.\n\n\"Your Highness,\" a servant called from outside the door. \"The king requests your presence in the throne room.\"\n\nYan Long sighed, smoothing his sleeves to hide the scales. He had known this day would come, but he had hoped it would be later.\n\nAs he walked through the castle halls, the whispers of the servants followed him. \"The prince is different,\" they said. \"His eyes... they glow like embers.\"\n\nYan Long ignored them, keeping his head down as he entered the throne room. His father, King Yan, sat on the golden throne, his face grave.\n\n\"Father,\" Yan Long said, bowing.\n\n\"Yan Long,\" the king said, his voice heavy. \"Come closer.\"\n\nYan Long stepped forward, his heart pounding. He could see the worry in his father's eyes, and it made him uneasy.\n\n\"I have something to tell you,\" the king said. \"Something that has been kept secret for generations.\"\n\n\"What is it, Father?\" Yan Long asked.\n\n\"The kingdom is in danger,\" the king said. \"An ancient evil is awakening - a darkness that once threatened to destroy everything we hold dear.\"\n\nYan Long's eyes widened. \"What kind of evil?\"\n\n\"The Shadow Dragon,\" the king said. \"A creature of pure darkness, born from the void itself. It was defeated centuries ago by our ancestor, the first Dragon King, but now it is rising again.\"\n\n\"And... what does this have to do with me?\" Yan Long asked.\n\nThe king stood up, his gaze intense. \"Because you are the only one who can stop it. You carry the blood of dragons, Yan Long. The blood of the Dragon King himself.\"\n\n\"But I've never used my powers,\" Yan Long said. \"I don't even know how.\"\n\n\"That is why I'm sending you on a journey,\" the king said. \"To the Dragon Temple, where you will learn the ways of your ancestors. There, you will master your dragon powers and become the warrior you were born to be.\"\n\nYan Long stared at his father, his mind racing. He had always known he was different, but this... this was more than he could have imagined.\n\n\"When do I leave?\" he asked.\n\n\"At dawn,\" the king said. \"You will be accompanied by two of our finest knights - Sir Wei and Lady Chen. They will protect you on your journey.\"\n\nYan Long nodded, accepting his fate. He had spent his entire life hiding who he was, but now he would embrace it.\n\nThat night, Yan Long stood on the castle walls, looking out at the kingdom. The moon hung low in the sky, casting a silver glow over the land.\n\n\"I will protect you,\" he whispered. \"I promise.\"\n\nAs he turned to leave, a soft voice spoke from the shadows.\n\n\"Your Highness...\"\n\nYan Long turned, seeing a young woman standing in the darkness. She was beautiful, with long black hair and eyes that sparkled like stars.\n\n\"Who are you?\" he asked.\n\n\"I am Lin Yue,\" she said, stepping into the light. \"And I have a message for you.\"\n\n\"What message?\"\n\n\"The Shadow Dragon is not the only threat you face,\" she said. \"There are those who would use your powers for their own gain. Be careful who you trust.\"\n\nBefore Yan Long could ask more, she vanished into the night, leaving only a faint scent of jasmine in the air.\n\nYan Long stood there for a moment, his mind filled with questions. Who was Lin Yue? How did she know about his secret?\n\nBut there was no time to dwell on it. At dawn, he would begin his journey.\n\nAnd the fate of the kingdom would depend on his success.",
        "updatedAt": "2024-01-01T12:00:00Z"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        loadSettings();
        initTheme();
        initNav();
        loadData();
        
        const page = getPageName();
        switch(page) {
            case 'index':
                renderFeaturedNovels();
                renderLatestChapters();
                break;
            case 'novels':
                renderNovelsList();
                initFilters();
                break;
            case 'novel':
                loadNovelDetail();
                break;
            case 'read':
                loadChapter();
                initReadingSettings();
                break;
        }
    } catch(err) {
        console.error('[App] DOMContentLoaded init error:', err);
    }
});

function getPageName() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const filename = parts[parts.length - 1] || 'index.html';
    return filename.replace('.html', '');
}

function loadData() {
    if (typeof NOVEL_DATA_LITE !== 'undefined' && NOVEL_DATA_LITE) {
        novels = NOVEL_DATA_LITE;
    } else if (typeof NOVEL_DATA !== 'undefined' && NOVEL_DATA) {
        novels = NOVEL_DATA;
    } else {
        novels = fallbackNovels;
    }
}

function loadSettings() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        settings = { ...settings, ...JSON.parse(saved) };
    }
}

function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function initTheme() {
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = settings.theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const themes = ['light', 'dark', 'sepia'];
    const currentIndex = themes.indexOf(settings.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    settings.theme = themes[nextIndex];
    
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = settings.theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
    
    saveSettings();
}

function initNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function renderFeaturedNovels() {
    const container = document.getElementById('featuredNovels');
    if (!container) return;
    
    const featured = novels.slice(0, 6);
    container.innerHTML = featured.map(novel => createNovelCard(novel)).join('');
    
    container.querySelectorAll('.novel-card').forEach(card => {
        card.addEventListener('click', () => {
            const novelId = card.dataset.id;
            window.location.href = `novel.html?id=${novelId}`;
        });
    });
}

function renderLatestChapters() {
    const container = document.getElementById('latestChapters');
    if (!container) return;
    
    const chapters = [];
    novels.forEach(novel => {
        if (novel.chapters && novel.chapters.length > 0) {
            const latestChapter = novel.chapters[novel.chapters.length - 1];
            chapters.push({
                ...latestChapter,
                novelTitle: novel.title,
                cover: novel.cover,
                novelId: novel.id
            });
        }
    });
    
    chapters.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    container.innerHTML = chapters.slice(0, 5).map(chapter => `
        <div class="chapter-item" data-novel="${chapter.novelId}" data-chapter="${chapter.id}">
            <div class="chapter-item-left">
                <div class="chapter-item-cover">
                    <img src="${chapter.cover}" alt="${chapter.novelTitle}">
                </div>
                <div class="chapter-item-info">
                    <h4>${chapter.title}</h4>
                    <p>${chapter.novelTitle}</p>
                </div>
            </div>
            <div class="chapter-item-time">${formatDate(chapter.updatedAt)}</div>
        </div>
    `).join('');
    
    container.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('click', () => {
            const novelId = item.dataset.novel;
            const chapterId = item.dataset.chapter;
            window.location.href = `read.html?novel=${novelId}&chapter=${chapterId}`;
        });
    });
}

function renderNovelsList() {
    const container = document.getElementById('novelsGrid');
    if (!container) return;
    
    container.innerHTML = novels.map(novel => createNovelCard(novel)).join('');
    
    container.querySelectorAll('.novel-card').forEach(card => {
        card.addEventListener('click', () => {
            const novelId = card.dataset.id;
            window.location.href = `novel.html?id=${novelId}`;
        });
    });
    
    renderPagination(1);
}

function createNovelCard(novel) {
    const rating = novel.rating || '4.0';
    const status = novel.status || 'ongoing';
    const chapterCount = novel.chapters ? novel.chapters.length : 0;
    
    return `
        <div class="novel-card" data-id="${novel.id}">
            <div class="novel-card-cover">
                <img src="${novel.cover}" alt="${novel.title}">
                <span class="novel-card-badge">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
            <div class="novel-card-content">
                <h3 class="novel-card-title">${novel.title}</h3>
                <p class="novel-card-author">By ${novel.author}</p>
                <div class="novel-card-tags">
                    <span class="novel-card-tag">${novel.genre}</span>
                </div>
                <div class="novel-card-stats">
                    <span><i class="fas fa-star"></i> ${rating}</span>
                    <span>${chapterCount} chapters</span>
                </div>
            </div>
        </div>
    `;
}

function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const genreFilter = document.getElementById('genreFilter');
    const sortBy = document.getElementById('sortBy');
    
    const filterHandler = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const genre = genreFilter.value;
        const sort = sortBy.value;
        
        let filtered = novels.filter(novel => {
            const matchesSearch = novel.title.toLowerCase().includes(searchTerm) ||
                               novel.author.toLowerCase().includes(searchTerm);
            const matchesGenre = genre === 'all' || novel.genre.toLowerCase() === genre;
            return matchesSearch && matchesGenre;
        });
        
        filtered.sort((a, b) => {
            switch(sort) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'latest':
                    return new Date(b.updatedAt) - new Date(a.updatedAt);
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
        
        const container = document.getElementById('novelsGrid');
        if (container) {
            container.innerHTML = filtered.map(novel => createNovelCard(novel)).join('');
            
            container.querySelectorAll('.novel-card').forEach(card => {
                card.addEventListener('click', () => {
                    const novelId = card.dataset.id;
                    window.location.href = `novel.html?id=${novelId}`;
                });
            });
        }
    };
    
    searchInput?.addEventListener('input', filterHandler);
    searchBtn?.addEventListener('click', filterHandler);
    genreFilter?.addEventListener('change', filterHandler);
    sortBy?.addEventListener('change', filterHandler);
}

function renderPagination(currentPage) {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = Math.ceil(novels.length / 12);
    let html = '';
    
    if (currentPage > 1) {
        html += `<button onclick="renderPagination(${currentPage - 1})">Previous</button>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="renderPagination(${i})">${i}</button>`;
    }
    
    if (currentPage < totalPages) {
        html += `<button onclick="renderPagination(${currentPage + 1})">Next</button>`;
    }
    
    container.innerHTML = html;
}

function loadNovelDetail() {
    const params = new URLSearchParams(window.location.search);
    const novelId = params.get('id');
    
    if (!novelId) {
        window.location.href = 'novels.html';
        return;
    }
    
    currentNovel = novels.find(n => n.id === novelId);
    
    if (!currentNovel) {
        window.location.href = 'novels.html';
        return;
    }
    
    document.getElementById('novelTitle').textContent = currentNovel.title;
    document.getElementById('novelAuthor').textContent = currentNovel.author;
    document.getElementById('novelGenre').textContent = currentNovel.genre;
    document.getElementById('novelStatus').textContent = currentNovel.status;
    document.getElementById('novelViews').textContent = formatNumber(currentNovel.views || 0);
    document.getElementById('novelRating').textContent = currentNovel.rating || '4.0';
    document.getElementById('novelChapters').textContent = `${currentNovel.chapters?.length || 0} chapters`;
    document.getElementById('novelDescription').textContent = currentNovel.description;
    document.getElementById('novelCover').src = currentNovel.cover;
    
    const readNowBtn = document.getElementById('readNowBtn');
    if (readNowBtn && currentNovel.chapters && currentNovel.chapters.length > 0) {
        readNowBtn.href = `read.html?novel=${novelId}&chapter=${currentNovel.chapters[0].id}`;
    }
    
    // 收藏按钮
    const addToFavoritesBtn = document.getElementById('addToFavorites');
    if (addToFavoritesBtn) {
        const favorites = JSON.parse(localStorage.getItem('novel_favorites') || '[]');
        const isFav = favorites.includes(novelId);
        if (isFav) {
            addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
            addToFavoritesBtn.classList.add('favorited');
        }
        addToFavoritesBtn.addEventListener('click', () => {
            const favs = JSON.parse(localStorage.getItem('novel_favorites') || '[]');
            const idx = favs.indexOf(novelId);
            if (idx === -1) {
                favs.push(novelId);
                addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
                addToFavoritesBtn.classList.add('favorited');
            } else {
                favs.splice(idx, 1);
                addToFavoritesBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
                addToFavoritesBtn.classList.remove('favorited');
            }
            localStorage.setItem('novel_favorites', JSON.stringify(favs));
        });
    }
    
    renderChaptersList();
    initChapterNav();
}

function renderChaptersList() {
    const container = document.getElementById('chapterItems');
    if (!container || !currentNovel?.chapters) return;
    
    const chapters = [...currentNovel.chapters].reverse();
    
    container.innerHTML = chapters.map(chapter => `
        <a href="read.html?novel=${currentNovel.id}&chapter=${chapter.id}" class="chapter-item-link">
            ${chapter.title}
        </a>
    `).join('');
}

function initChapterNav() {
    const prevBtn = document.getElementById('prevChapterBtn');
    const nextBtn = document.getElementById('nextChapterBtn');
    
    if (!currentNovel?.chapters) return;
    
    prevBtn?.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const chapterId = params.get('chapter');
        if (!chapterId) return;
        
        const currentIndex = currentNovel.chapters.findIndex(c => c.id === chapterId);
        if (currentIndex > 0) {
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[currentIndex - 1].id}`;
        }
    });
    
    nextBtn?.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const chapterId = params.get('chapter');
        
        let currentIndex = -1;
        if (chapterId) {
            currentIndex = currentNovel.chapters.findIndex(c => c.id === chapterId);
        }
        
        if (currentIndex < currentNovel.chapters.length - 1) {
            const nextIndex = currentIndex === -1 ? 0 : currentIndex + 1;
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[nextIndex].id}`;
        }
    });
}

function loadChapter() {
    const params = new URLSearchParams(window.location.search);
    const novelId = params.get('novel');
    const chapterId = params.get('chapter');
    
    if (!novelId || !chapterId) {
        window.location.href = 'novels.html';
        return;
    }
    
    currentNovel = novels.find(n => n.id === novelId);
    
    if (!currentNovel) {
        window.location.href = 'novels.html';
        return;
    }
    
    currentChapter = currentNovel.chapters.find(c => c.id === chapterId);
    
    if (!currentChapter) {
        window.location.href = `novel.html?id=${novelId}`;
        return;
    }
    
    document.getElementById('chapterTitle').textContent = currentChapter.title;
    document.getElementById('novelName').textContent = currentNovel.title;
    document.getElementById('chapterNumber').textContent = `Chapter ${currentChapter.number}`;
    
    const contentContainer = document.getElementById('chapterContent');
    
    // Try to get content from CHAPTERS_DATA first
    let chapterContent = null;
    if (typeof CHAPTERS_DATA !== 'undefined' && CHAPTERS_DATA && CHAPTERS_DATA[chapterId]) {
        chapterContent = CHAPTERS_DATA[chapterId].content;
    } else if (currentChapter.content) {
        chapterContent = currentChapter.content;
    }
    
    if (chapterContent) {
        contentContainer.innerHTML = chapterContent.split('\n').map(p => 
            p.trim() ? `<p>${p}</p>` : ''
        ).join('');
    } else {
        contentContainer.innerHTML = '<p>Chapter content not available.</p>';
    }
    
    applyReadingSettings();
    initChapterNavigation();
    initTableOfContents();
}

function initChapterNavigation() {
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');
    const backBtn = document.getElementById('backBtn');
    
    if (!prevBtn || !nextBtn) return;
    
    const currentIndex = currentNovel.chapters.findIndex(c => c.id === currentChapter.id);
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[currentIndex - 1].id}`;
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentNovel.chapters.length - 1) {
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${currentNovel.chapters[currentIndex + 1].id}`;
        }
    });
    
    backBtn?.addEventListener('click', () => {
        window.location.href = `novel.html?id=${currentNovel.id}`;
    });
}

function initTableOfContents() {
    const tocBtn = document.getElementById('tableOfContentsBtn');
    const tocModal = document.getElementById('tableOfContentsModal');
    const closeTocModal = document.getElementById('closeTocModal');
    const tocList = document.getElementById('tocList');
    
    if (!tocBtn || !tocModal || !closeTocModal || !tocList) return;
    
    tocList.innerHTML = currentNovel.chapters.map((chapter, index) => `
        <div class="toc-item ${chapter.id === currentChapter.id ? 'active' : ''}" 
             data-chapter="${chapter.id}" 
             data-index="${index}">
            ${chapter.title}
        </div>
    `).join('');
    
    tocBtn.addEventListener('click', () => {
        tocModal.classList.add('active');
    });
    
    closeTocModal.addEventListener('click', () => {
        tocModal.classList.remove('active');
    });
    
    tocModal.addEventListener('click', (e) => {
        if (e.target === tocModal) {
            tocModal.classList.remove('active');
        }
    });
    
    tocList.querySelectorAll('.toc-item').forEach(item => {
        item.addEventListener('click', () => {
            const chapterId = item.dataset.chapter;
            window.location.href = `read.html?novel=${currentNovel.id}&chapter=${chapterId}`;
        });
    });
}

function initReadingSettings() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModal = document.getElementById('closeSettingsModal');
    
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const lineHeightSlider = document.getElementById('lineHeightSlider');
    const lineHeightValue = document.getElementById('lineHeightValue');
    const pageWidthSlider = document.getElementById('pageWidthSlider');
    const pageWidthValue = document.getElementById('pageWidthValue');
    
    const fontSizeDecrease = document.getElementById('fontSizeDecrease');
    const fontSizeIncrease = document.getElementById('fontSizeIncrease');
    const fontFamily = document.getElementById('fontFamily');
    
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (!settingsBtn || !settingsModal || !closeSettingsModal) return;
    
    if (fontSizeSlider) fontSizeSlider.value = settings.fontSize;
    if (fontSizeValue) fontSizeValue.textContent = `${settings.fontSize}px`;
    if (lineHeightSlider) lineHeightSlider.value = settings.lineHeight;
    if (lineHeightValue) lineHeightValue.textContent = settings.lineHeight;
    if (pageWidthSlider) pageWidthSlider.value = settings.pageWidth;
    if (pageWidthValue) pageWidthValue.textContent = `${settings.pageWidth}%`;
    if (fontFamily) fontFamily.value = settings.fontFamily;
    
    themeOptions.forEach(option => {
        if (option.dataset.theme === settings.theme) {
            option.classList.add('active');
        }
    });
    
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsModal.classList.add('active');
    });
    
    closeSettingsModal.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
    
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
    
    fontSizeSlider?.addEventListener('input', (e) => {
        settings.fontSize = parseInt(e.target.value);
        if (fontSizeValue) fontSizeValue.textContent = `${settings.fontSize}px`;
        applyReadingSettings();
        saveSettings();
    });
    
    lineHeightSlider?.addEventListener('input', (e) => {
        settings.lineHeight = parseFloat(e.target.value);
        if (lineHeightValue) lineHeightValue.textContent = settings.lineHeight;
        applyReadingSettings();
        saveSettings();
    });
    
    pageWidthSlider?.addEventListener('input', (e) => {
        settings.pageWidth = parseInt(e.target.value);
        if (pageWidthValue) pageWidthValue.textContent = `${settings.pageWidth}%`;
        applyReadingSettings();
        saveSettings();
    });
    
    fontFamily?.addEventListener('change', (e) => {
        settings.fontFamily = e.target.value;
        applyReadingSettings();
        saveSettings();
    });
    
    fontSizeDecrease?.addEventListener('click', () => {
        if (settings.fontSize > 14) {
            settings.fontSize--;
            fontSizeSlider.value = settings.fontSize;
            fontSizeValue.textContent = `${settings.fontSize}px`;
            applyReadingSettings();
            saveSettings();
        }
    });
    
    fontSizeIncrease?.addEventListener('click', () => {
        if (settings.fontSize < 28) {
            settings.fontSize++;
            fontSizeSlider.value = settings.fontSize;
            fontSizeValue.textContent = `${settings.fontSize}px`;
            applyReadingSettings();
            saveSettings();
        }
    });
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            settings.theme = option.dataset.theme;
            document.documentElement.setAttribute('data-theme', settings.theme);
            
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.innerHTML = settings.theme === 'dark' 
                    ? '<i class="fas fa-sun"></i>' 
                    : '<i class="fas fa-moon"></i>';
            }
            
            saveSettings();
        });
    });
    
    applyReadingSettings();
}

function applyReadingSettings() {
    const chapterContent = document.getElementById('chapterContent');
    if (!chapterContent) return;
    
    chapterContent.style.fontSize = `${settings.fontSize}px`;
    chapterContent.style.lineHeight = settings.lineHeight;
    chapterContent.style.fontFamily = settings.fontFamily === 'serif' 
        ? "'Noto Serif SC', serif" 
        : settings.fontFamily === 'monospace' 
            ? "'Courier New', monospace" 
            : "'Roboto', sans-serif";
    chapterContent.style.maxWidth = `${settings.pageWidth}%`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    
    return date.toLocaleDateString();
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}