import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { Card } from "@/components/ui/card";

const songs = [
  { title: "Song One", artist: "Artist One", src: "song1.mp3" },
  { title: "Song Two", artist: "Artist Two", src: "song2.mp3" },
  { title: "Song Three", artist: "Artist Three", src: "song3.mp3" },
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextSong = () =>
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
  const prevSong = () =>
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Spotify Clone</h1>
      <Card className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold">SONG</h2>
          <p className="text-gray-400">Alfonso</p>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button className="p-2 bg-gray-700 rounded-full">
            <SkipBack size={20} />
          </button>
          <button className="p-3 bg-green-500 rounded-full text-black">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="p-2 bg-gray-700 rounded-full">
            <SkipForward size={20} />
          </button>
        </div>
      </Card>
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Playlist</h2>
        <ul className="bg-gray-800 p-4 rounded-lg">
          {songs.map((song, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${
                index === currentSongIndex
                  ? "bg-green-500 text-black"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setCurrentSongIndex(index)}
            >
              {song.title} - {song.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
