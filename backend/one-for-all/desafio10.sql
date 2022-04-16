SELECT sng.song_name AS nome, COUNT(hst.song_id) AS reproducoes
FROM user_history AS hst
INNER JOIN SpotifyClone.songs AS sng
ON sng.song_id = hst.song_id
INNER JOIN SpotifyClone.user_overview AS ovv
ON hst.user_id = ovv.user_id
INNER JOIN SpotifyClone.subscribe AS sub
ON sub.plan_id = ovv.plan_id
WHERE sub.plan_name IN ('gratuito', 'pessoal')
GROUP BY sng.song_id
ORDER BY sng.song_name;
