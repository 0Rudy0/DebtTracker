USE [DebtTracker]
GO
/****** Object:  StoredProcedure [dbo].[payUnpaid]    Script Date: 16.9.2015. 18:10:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[payUnpaid] (
	@Owner VARCHAR(128)
) AS
BEGIN
	CREATE TABLE #unpaidDebts
	(
	   Id INT,
	   Description VARCHAR(100),
	   Ammount INT,
	   Date DATE,
	   TypeiD INT,
	   DoesRepeat BIT,
	   RepeatCount int,
	   UserOwner VARCHAR(128),
	   ForUser VARCHAR(128)
	)

	INSERT INTO #unpaidDebts
	Exec getUnpaidDebts @ForUser = @Owner

	--select * from #unpaidDebts

	declare @DebtId int

	while exists (select * from #unpaidDebts)
	begin

		select @DebtId = (select top 1 Id
							from #unpaidDebts
							order by Id asc)

		INSERT INTO PaidDebts VALUES(@DebtId, GETDATE())

		delete #unpaidDebts
		where Id = @DebtId

	end
	return 'success'
END
