// import {useState, useEffect} from 'react'
import { Session } from '../../components/types';



export default function HalfCourt() {

  interface PositionAccuracy {
    position: string;
    percentage: number;
  }

  interface PositionStats {
    totalMakes: number;
    totalReps: number;
  }

  const doneSessions: Session[] = JSON.parse(localStorage.getItem("doneSessions") || "[]");

  function calculatePositionAccuracy(doneSessions: Session[]): PositionAccuracy[] {
    const positionStats: Record<string, PositionStats> = {};
  
    doneSessions.forEach((session) => {
      session.exercises.forEach((exercise) => {
        const { position, makes, reps } = exercise;
  
        if (!positionStats[position]) {
          positionStats[position] = { totalMakes: 0, totalReps: 0 };
        }
  
        positionStats[position].totalMakes += makes;
        positionStats[position].totalReps += reps;
      });
    });
  
    const positionAccuracy: PositionAccuracy[] = Object.keys(positionStats).map((position) => ({
      position,
      percentage:
        positionStats[position].totalReps > 0
          ? Math.round((positionStats[position].totalMakes / positionStats[position].totalReps) * 100)
          : 0,
    }));
  
    return positionAccuracy;
  }

  const positionAccuracy = calculatePositionAccuracy(doneSessions);



const shotData = [
  "corner-L",
  "corner-R",
  "fortyfive-L",
  "fortyfive-R",
  "center",
  "two-corner-L",
  "two-corner-R",
  "freethrow",
].map((position) => ({
  position,
  percentage:
    positionAccuracy.find((item) => item.position === position)?.percentage || 0,
}));

  const getCircleColor = (percentage: number) => {
    if (percentage >= 60) return "#A31D1D";
    if (percentage >= 50) return "#FFB433";
    if (percentage >= 40) return "#578FCA";
    return "#8C8C8C";
  };

  const shotElements = shotData.map((shot) => (
    <div
      key={shot.position}
      className={`shot-position ${shot.position}`} 
      style={{
        backgroundColor: getCircleColor(shot.percentage),
        color: "white",
      }}
    >
      {shot.percentage}%
    </div>
  ));

  return (
    <>
    <div className="halfcourt__img">
      <img src="public/media/halfcourt.png" alt="Halfcourt" />

      {shotElements}

    </div>
    <div className="color_subtitle">
        <p style={{color: '#A31D1D'}}>+60%</p>
        <p style={{color: '#FFB433'}}>+50%</p>
        <p style={{color: '#578FCA'}}>+40%</p>
        <p style={{color: '#8C8C8C'}}>-40%</p>
    </div>
    </>
  );
}
