create or replace view dashboard_global as
select (select count(*) from stations_pluvio) as stations_pluvio,(select count(*) from observations_pluvio) as observations_pluvio,(select count(*) from piezometres) as piezometres,(select count(*) from observations_piezo) as observations_piezo,(select count(*) from stations_limni) as stations_limni,(select count(*) from observations_limni) as observations_limni,(select count(*) from points_eau) as points_eau;
create or replace view v_carte_points as
select 'pluviometrie' as module, code_station as code, nom_station as libelle, latitude, longitude, synced_at from stations_pluvio where latitude is not null and longitude is not null
union all select 'piezometrie', code_piezo, code_piezo, latitude, longitude, synced_at from piezometres where latitude is not null and longitude is not null
union all select 'limnimetrie', code_station, cours_eau, latitude, longitude, synced_at from stations_limni where latitude is not null and longitude is not null
union all select 'points_eau', code_pe, type_ouvrage, latitude, longitude, synced_at from points_eau where latitude is not null and longitude is not null;
