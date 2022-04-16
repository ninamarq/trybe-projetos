SELECT art.artist_name AS artista, alb.album_name AS album, COUNT(flw.artist_id) AS seguidores
FROM SpotifyClone.artist AS art
INNER JOIN SpotifyClone.albums AS alb
	ON art.artist_id = alb.artist_id
INNER JOIN SpotifyClone.user_following AS flw
	ON art.artist_id = flw.artist_id
    GROUP BY art.artist_id, alb.album_name
ORDER BY seguidores DESC, artista, album;
