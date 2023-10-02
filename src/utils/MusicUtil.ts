import Music from "@/beans/Music";

export default class MusicUtil {
  public static generateMusicArray(data: any[], method: (data: any) => Music): Music[] {
    const result: Music[] = [];

    data.forEach(async () => {
      const musicCell = await method(data);
      result.push(new Music(musicCell.name, musicCell.artist, musicCell.cover, musicCell.lrc, musicCell.content));
    })

    return result;
  }
}