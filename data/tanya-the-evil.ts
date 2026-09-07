export interface TanyaVolumeData {
  id: string;
  volumeNumber: string;
  title: string;
  releaseDateJP: string;
  releaseDateEN: string;
  coverImage: string;
  synopsis: string;
  chapters: string[];
  epubSource?: string;
  inProgress?: boolean;
}

export const tanyaVolumes: TanyaVolumeData[] = [
  {
    id: "v1",
    volumeNumber: "1",
    title: "Saga of Tanya the Evil, Vol. 1",
    releaseDateJP: "December 27, 2013",
    releaseDateEN: "June 21, 2016",
    coverImage: "/assets/images/tanya-the-evil/v1/cover.jpg",
    synopsis: "A salaryman who mocks a god is reincarnated as a little girl in a world on the brink of total war. Armed with an analytical mind and an engineer's pragmatism, Tanya von Degurechaff will claw her way to the top of the Empire's military hierarchy — or die trying.",
    chapters: [
      "Prologue: The Devil of the Rhine",
      "Chapter 1: Beginning of the End",
      "Chapter 2: The Right to Lead",
      "Chapter 3: On the Job Training",
      "Chapter 4: The Best Resistance",
      "Chapter 5: The Path to Victory",
      "Epilogue: The Devil Whispers"
    ]
  },
  {
    id: "v2",
    volumeNumber: "2",
    title: "Saga of Tanya the Evil, Vol. 2",
    releaseDateJP: "June 27, 2014",
    releaseDateEN: "October 25, 2016",
    coverImage: "/assets/images/tanya-the-evil/v2/cover.jpg",
    synopsis: "The Great War rages on and Tanya's squadron, the 203rd Aerial Mage Battalion, is thrust into the most dangerous theaters of combat. With the Empire's war effort deteriorating, she must balance the demands of the front line with the political machinations threatening her career.",
    chapters: [
      "Prologue: Mud and Blood",
      "Chapter 1: The 203rd Mage Battalion",
      "Chapter 2: It's a Military Affair",
      "Chapter 3: Do or Die",
      "Chapter 4: The Price of Loyalty",
      "Chapter 5: Firestorm",
      "Epilogue: Another Day, Another Dollar"
    ]
  },
  {
    id: "v3",
    volumeNumber: "3",
    title: "Saga of Tanya the Evil, Vol. 3",
    releaseDateJP: "December 25, 2014",
    releaseDateEN: "March 21, 2017",
    coverImage: "/assets/images/tanya-the-evil/v3/cover.jpg",
    synopsis: "Operation Sturmrad has failed and the Empire's strategic situation is dire. Tanya is reassigned to the General Staff, far from the front lines — but Being X's interference ensures that peace is never an option.",
    chapters: [
      "Prologue: The War Trolls",
      "Chapter 1: The Rear Echelon",
      "Chapter 2: The New Strategy",
      "Chapter 3: Dust and Iron",
      "Chapter 4: Rognarok",
      "Chapter 5: The Wings of Victory",
      "Epilogue: God Willing"
    ]
  },
  {
    id: "v4",
    volumeNumber: "4",
    title: "Saga of Tanya the Evil, Vol. 4",
    releaseDateJP: "July 25, 2015",
    releaseDateEN: "July 25, 2017",
    coverImage: "/assets/images/tanya-the-evil/v4/cover.jpg",
    synopsis: "The Empire faces a two-front war as the Federation opens a new offensive in the east. Tanya leads her mages into the frozen hell of the Federation's winter campaign, where the cold may be as deadly as the enemy.",
    chapters: [
      "Prologue: Eastern Front",
      "Chapter 1: The Frozen Front",
      "Chapter 2: Into the Unknown",
      "Chapter 3: Ambush",
      "Chapter 4: The Breakthrough",
      "Chapter 5: Winter War",
      "Epilogue: Spring Will Come"
    ]
  },
  {
    id: "v5",
    volumeNumber: "5",
    title: "Saga of Tanya the Evil, Vol. 5",
    releaseDateJP: "January 25, 2016",
    releaseDateEN: "December 19, 2017",
    coverImage: "/assets/images/tanya-the-evil/v5/cover.jpg",
    synopsis: "The Empire has lost ground and Tanya's strategic genius is needed more than ever. She's promoted to Major and tasked with developing a new aerial warfare doctrine that could turn the tide — if the Empire doesn't collapse first.",
    chapters: [
      "Prologue: The Weight of Stars",
      "Chapter 1: Promotion",
      "Chapter 2: New Doctrines",
      "Chapter 3: The Air Battle",
      "Chapter 4: War is Hell",
      "Chapter 5: Turning the Tide",
      "Epilogue: The Stars We Reach"
    ]
  },
  {
    id: "v6",
    volumeNumber: "6",
    title: "Saga of Tanya the Evil, Vol. 6",
    releaseDateJP: "July 25, 2016",
    releaseDateEN: "June 26, 2018",
    coverImage: "/assets/images/tanya-the-evil/v6/cover.jpg",
    synopsis: "The final offensive begins. The Empire's resources are stretched thin, and Tanya must lead the 203rd into the decisive battle that will determine the fate of the continent — and her own survival.",
    chapters: [
      "Prologue: The Final Push",
      "Chapter 1: Regicide",
      "Chapter 2: The Battle of the Rhine",
      "Chapter 3: Checkmate",
      "Chapter 4: The Last Stand",
      "Chapter 5: Victory at Last",
      "Epilogue: The Devil's Reward"
    ]
  },
  {
    id: "v7",
    volumeNumber: "7",
    title: "Saga of Tanya the Evil, Vol. 7",
    releaseDateJP: "November 25, 2016",
    releaseDateEN: "October 30, 2018",
    coverImage: "/assets/images/tanya-the-evil/v7/cover.jpg",
    synopsis: "Post-war reconstruction and political upheaval await. Tanya navigates the treacherous waters of peacetime politics while Being X plots one final gambit to break her faith in rationality.",
    chapters: [
      "Prologue: After the Storm",
      "Chapter 1: Reconstruction",
      "Chapter 2: Politics as War",
      "Chapter 3: The Devil's Gambit",
      "Chapter 4: Faith vs. Reason",
      "Chapter 5: One Last Fight",
      "Epilogue: Until We Meet Again"
    ]
  },
  {
    id: "v8",
    volumeNumber: "8",
    title: "Saga of Tanya the Evil, Vol. 8",
    releaseDateJP: "June 25, 2017",
    releaseDateEN: "March 12, 2019",
    coverImage: "/assets/images/tanya-the-evil/v8/cover.jpg",
    synopsis: "A new conflict ignites as the Allied Kingdoms grow ambitious. Tanya is called back to active duty and must contend with an enemy that has learned from every defeat the Empire has inflicted.",
    chapters: [
      "Prologue: The New Threat",
      "Chapter 1: Called to Arms",
      "Chapter 2: The Allied Plan",
      "Chapter 3: Strategic Withdrawal",
      "Chapter 4: Counterattack",
      "Chapter 5: The Devil Returns",
      "Epilogue: Round Two"
    ]
  }
];
