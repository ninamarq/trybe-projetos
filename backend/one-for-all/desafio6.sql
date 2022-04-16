SELECT
	MIN(sub.plan_price) AS faturamento_minimo,
	MAX(sub.plan_price) AS faturamento_maximo,
	ROUND(AVG(sub.plan_price), 2) AS faturamento_medio,
	SUM(sub.plan_price) AS faturamento_total
FROM SpotifyClone.subscribe AS sub
JOIN SpotifyClone.user_overview AS ovv
WHERE sub.plan_id = ovv.plan_id;
