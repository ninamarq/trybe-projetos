SELECT sng.song_name AS cancao ,COUNT(hst.song_id) AS reproducoes
FROM SpotifyClone.user_history AS hst
INNER JOIN SpotifyClone.songs AS sng
	ON sng.song_id = hst.song_id
GROUP BY sng.song_id
ORDER BY reproducoes DESC, cancao
LIMIT 2;
