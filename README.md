# PSORE V1.1 consolidée

Cette version intègre les arbitrages validés :
- OpenStreetMap + satellite ;
- couches administratives Mali/Koulikoro ;
- points Epicollect dynamiques ;
- état vide clair avant enquête ;
- rapports globaux et par module ;
- exports PDF, Word, Excel, CSV ;
- rôles et droits consolidés ;
- création d’utilisateurs par invitation email ;
- synchronisation automatique toutes les 6 heures ;
- page publique avec statistiques agrégées ;
- alertes visuelles et préparation email.

## Scripts Supabase à exécuter

1. `database/schema.sql`
2. `database/seed.sql`
3. `database/rls.sql`
4. `database/views.sql`
5. `database/alerts.sql`

## Tests

- `/api/health`
- `/api/admin/bootstrap`
- `/api/sync/all`
- `/api/cron/sync`
- `/api/alerts/check`
- `/cartographie`
- `/rapports`
- `/observatoire`
- `/admin/roles`
