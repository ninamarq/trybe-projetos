SELECT ovv.user_name AS usuario, IF(MAX(YEAR(hst.reprodution_date) > 2020), 'Usuário ativo', 'Usuário inativo') AS condicao_usuario
FROM SpotifyClone.user_overview AS ovv
INNER JOIN SpotifyClone.user_history AS hst
	ON ovv.user_id = hst.user_id
    GROUP BY hst.user_id
ORDER BY ovv.user_name;
