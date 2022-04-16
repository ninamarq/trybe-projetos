SELECT ovr.user_name AS usuario,
	COUNT(hst.song_id) AS qtde_musicas_ouvidas,
    ROUND(SUM(sng.song_duration/60), 2) AS total_minutos
FROM SpotifyClone.user_overview AS ovr
INNER JOIN SpotifyClone.user_history AS hst
	ON ovr.user_id = hst.user_id
INNER JOIN SpotifyClone.songs as sng
	ON hst.song_id = sng.song_id
    GROUP BY hst.user_id
ORDER BY ovr.user_name;
