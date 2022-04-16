SELECT COUNT(cancao.song_name) AS cancoes,
	COUNT(artista.artist_name) AS artistas,
    COUNT(album.album_name) AS albuns
FROM SpotifyClone.songs AS cancao
LEFT JOIN SpotifyClone.artist AS artista
	ON cancao.song_id = artista.artist_id
LEFT JOIN SpotifyClone.albums AS album
	ON cancao.song_id = album.album_id;
