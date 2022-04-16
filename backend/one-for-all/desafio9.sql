SELECT COUNT(hst.song_id) AS quantidade_musicas_no_historico
FROM user_history AS hst
INNER JOIN SpotifyClone.user_overview AS ovv
ON hst.user_id = ovv.user_id
WHERE ovv.user_name = 'Bill'
GROUP BY hst.user_id;
