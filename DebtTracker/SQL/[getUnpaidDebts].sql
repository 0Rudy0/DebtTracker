USE [DebtTracker]
GO
/****** Object:  StoredProcedure [dbo].[getUnpaidDebts]    Script Date: 16.9.2015. 18:10:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[getUnpaidDebts] (
	@ForUser VARCHAR(128)
	) AS
BEGIN
CREATE TABLE #unpaidDebts
	(
	   Id INT,
	   Description VARCHAR(100),
	   Ammount FLOAT,
	   Date DATE,
	   TypeId INT,
	   DoesRepeat BIT,
	   RepeatCount int,
	   UserOwner VARCHAR(128),
	   ForUser VARCHAR(128)
	)

	INSERT INTO #unpaidDebts 
		SELECT * FROM Debt d 
			WHERE d.Id not in (SELECT DebtId FROM PaidDebts)
			OR d.RepeatCount = -1
			OR (SELECT count(*) FROM PaidDebts WHERE DebtId = d.Id) < d.repeatCount
	
	update #unpaidDebts 
		set RepeatCount = RepeatCount - (SELECT count(*) FROM PaidDebts WHERE DebtId = #unpaidDebts.Id)
			WHERE RepeatCount > 0

	select * from #unpaidDebts

END
