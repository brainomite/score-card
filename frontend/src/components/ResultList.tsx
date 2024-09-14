import { sheetDataType, playerType } from "../types";
import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import { ScoreChip } from "./ScoreChip";

type scoreObjectType = {
  [name: string]: number;
};

const ResultList = ({ scoreData }: { scoreData: sheetDataType[] }) => {
  const sortedScoreList = useMemo(() => {
    const playerNames = scoreData[0].players.reduce((acc, { name }) => {
      return [...acc, name];
    }, [] as string[]);
    const startingScoreObject = playerNames.reduce((acc, name) => {
      return { ...acc, [name]: 0 };
    }, {}) as scoreObjectType;

    const addScoreFromCategory = (
      scoreObject: scoreObjectType,
      categoryScores: playerType[]
    ) => {
      return categoryScores.reduce((acc, { name, points }) => {
        return { ...acc, [name]: acc[name] + points };
      }, scoreObject);
    };

    const scoresObject = scoreData.reduce((acc, { players }) => {
      return addScoreFromCategory(acc, players);
    }, startingScoreObject);
    const scoreList = Object.entries(scoresObject) as [string, number][];

    return scoreList.sort((a, b) => b[1] - a[1]);
  }, [scoreData]);

  return (
    <Stack direction={"row"} spacing={2}>
      {sortedScoreList.map(([name, score]) => {
        return (
          <ScoreChip
            key={name}
            name={name}
            score={score}
            scoreData={scoreData}
          />
        );
      })}
    </Stack>
  );
};

export default ResultList;
