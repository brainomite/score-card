import { categoryType, playerPointsType } from "../types";
import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import { ScoreChip } from "./ScoreChip";

const ResultList = ({ scoreData }: { scoreData: categoryType }) => {
  const sortedScoreList = useMemo(() => {
    const playerNames = Object.keys(Object.values(scoreData)[0]);
    const startingScoreObject = playerNames.reduce((acc, name) => {
      return { ...acc, [name]: 0 };
    }, {}) as playerPointsType;

    const addScoreFromCategory = (
      scoreObject: playerPointsType,
      categoryScores: playerPointsType
    ) => {
      return Object.entries(categoryScores).reduce((acc, [name, points]) => {
        return { ...acc, [name]: acc[name] + points };
      }, scoreObject);
    };

    const scoresObject = Object.entries(scoreData).reduce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (acc, [_category, players]) => {
        return addScoreFromCategory(acc, players);
      },
      startingScoreObject
    );
    const scoreList = Object.entries(scoresObject) as [string, number][];
    return scoreList.sort(([nameA, pointsA], [nameB, pointsB]) => {
      return pointsA === pointsB
        ? nameA.localeCompare(nameB)
        : pointsB - pointsA;
    });
    // return scoreList.sort((a, b) => b[1] - a[1]);
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
