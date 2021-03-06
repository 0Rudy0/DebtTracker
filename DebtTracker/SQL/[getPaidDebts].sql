USE [DebtTracker]
GO
/****** Object:  StoredProcedure [dbo].[getPaidDebts]    Script Date: 16.9.2015. 18:05:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[getPaidDebts] (
	@DateFrom DATETIME,
	@DateTo DATETIME,
	@ForUser VARCHAR(128)
	) as
begin
	select p.DebtId, d.Description as debtName, p.payDate, d.Ammount, d.Date, dt.Description as debtType from PaidDebts p
		join Debt d on p.DebtId = d.Id 
		join DebtType dt on dt.Id = d.TypeId
		where p.PayDate >= @DateFrom 
		and p.paydate < @DateTo
		and d.ForUser = @ForUser
	end
