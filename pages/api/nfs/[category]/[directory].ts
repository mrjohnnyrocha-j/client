import { NextApiRequest, NextApiResponse } from 'next';

type FileType = { name: string; type: 'file'; icon: string; content: string };
type FolderType = { name: string; type: 'folder'; icon: string };

type Directory = {
  [key: string]: (FileType | FolderType)[];
};

type MockData = {
  [key: string]: Directory;
};

const mockData: MockData = {
  personal: {
    Root: [
      { name: "Documents", type: "folder", icon: "/assets/folder.svg" },
      { name: "Photos", type: "folder", icon: "/assets/folder.svg" },
      { name: "Notes.txt", type: "file", icon: "/assets/text-file.svg", content: "This is a text file." },
      { name: "Image.png", type: "file", icon: "/assets/picture.svg", content: "/assets/picture.png" },
    ],
    Folder1: [
      { name: "Project1.txt", type: "file", icon: "/assets/text-file.svg", content: "Project 1 details." },
    ],
    Folder2: [
      { name: "Project2.txt", type: "file", icon: "/assets/text-file.svg", content: "Project 2 details." },
    ],
  },
  professional: {
    Root: [
      { name: "WorkDocs", type: "folder", icon: "/assets/folder.svg" },
      { name: "Reports", type: "folder", icon: "/assets/folder.svg" },
      { name: "MeetingNotes.txt", type: "file", icon: "/assets/text-file.svg", content: "Notes from meetings." },
      { name: "Presentation.png", type: "file", icon: "/assets/picture.svg", content: "/assets/picture.png" },
    ],
    Folder1: [
      { name: "Report1.txt", type: "file", icon: "/assets/text-file.svg", content: "Report 1 details." },
    ],
    Folder2: [
      { name: "Report2.txt", type: "file", icon: "/assets/text-file.svg", content: "Report 2 details." },
    ],
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { category, directory } = req.query;

  if (typeof category === 'string' && typeof directory === 'string') {
    const data = mockData[category]?.[directory];
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: 'Category or directory not found' });
    }
  } else {
    res.status(400).json({ message: 'Invalid parameters' });
  }
};

export default handler;
