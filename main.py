import psycopg2
import datetime
import argparse

# Fonction pour établir une connexion à la base de données PostgreSQL
def connect_to_db():
    try:
        conn = psycopg2.connect(
            host='localhost',
            database='WalletDB',
            user='postgres',
            password='1234',
            client_encoding='utf-8'  # Spécifiez l'encodage client ici
        )
        print("Connexion à la base de données établie.")
        return conn
    except psycopg2.Error as e:
        print(f"Erreur lors de la connexion à la base de données: {e}")
        return None

# Les fonctions pour gérer les opérations sur la base de données restent inchangées...

def read(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM")

# Fonction pour créer un nouvel utilisateur
def create_user(conn):
    cur = conn.cursor()
    user_name = input("Entrez votre nom : ")
    user_email = input("Entrez votre email : ")
    user_password = input("Entrez votre mot de passe : ")
    val = int(input("Entrez le montant initial dans le compte : "))
    try:
        cur.execute(
            "INSERT INTO users (user_name, user_email, user_password, montant_total) VALUES (%s, %s, %s, )",
            (user_name, user_email, user_password, val)
        )
        conn.commit()
        print("Utilisateur créé avec succès!")
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Erreur lors de la création de l'utilisateur: {e}")
    finally:
        cur.close()

# Fonction pour créer un nouveau portefeuille
def create_wallet(conn):
    cur = conn.cursor()
    user_id = int(input("Entrez votre identifiant d'utilisateur: "))
    wallet_name = input("Entrez le nom du portefeuille: ")
    budget_maximal = float(input("Entrez le budget maximal: "))

    try:
        cur.execute(
            "INSERT INTO wallets (user_id, name, budget_maximal) VALUES (%s, %s, %s)",
            (user_id, wallet_name, budget_maximal)
        )
        conn.commit()
        print("Portefeuille créé avec succès!")
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Erreur lors de la création du portefeuille: {e}")
    finally:
        cur.close()

# Fonction pour ajouter ou réduire de l'argent dans un portefeuille
def add_or_reduce_money(conn):
    cur = conn.cursor()
    user_id = input("Entrez l'id de l'utilisateur : ")
    wallet_id = int(input("Entrez l'identifiant du portefeuille : "))
    amount = -float(input("Entrez le montant à ajouter(+) ou retirer(-): "))
    date = input("entrez la date dans le format YYYY:MM:DD : ")
    desc = input("Pourquoi utilisez vous cet argent: ")

    cur.execute(
        "SELECT solde_actuel FROM wallets WHERE id = %s AND user_id = %s",
        (wallet_id, user_id)
    )
    current_amount = float(cur.fetchone()[0])

    cur.execute(
        "SELECT budget_maximal FROM wallets WHERE id = %s AND user_id = %s",
        (wallet_id, user_id)
    )
    budget_maximal = float(cur.fetchone()[0])

    if current_amount+amount > budget_maximal:
        print("Veux tu depasser ton budget maximal : ")
        val = input("1 - Yes\n2 - No")
        if  val == 1:
            try:
                cur.execute(
                    "UPDATE wallets SET solde_actuel = solde_actuel + %s WHERE id = %s AND user_id = %s",
                    (amount, wallet_id, user_id)
                )
                conn.commit()

                cur.execute(
                    "INSERT INTO transactions (wallet_id, amount, description, transaction_date) VALUES (%s, %s, %s, %s)",
                    (wallet_id, amount, desc, date)
                    ) 
                conn.commit()
                print("Montant ajouté ou retiré avec succès!")
            except psycopg2.Error as e:
                conn.rollback()
                print(f"Erreur lors de l'ajout ou de la réduction de l'argent: {e}")
            finally:
                cur.close()
    else:
        try:
            cur.execute(
                "UPDATE wallets SET solde_actuel = solde_actuel + %s WHERE id = %s AND user_id = %s",
                (amount, wallet_id, user_id)
            )
            conn.commit()

            cur.execute(
                "INSERT INTO transactions (wallet_id, amount, description, transaction_date) VALUES (%s, %s, %s, %s)",
                (wallet_id, amount, desc, date)
                ) 
            conn.commit()
            print("Montant ajouté ou retiré avec succès!")
        except psycopg2.Error as e:
            conn.rollback()
            print(f"Erreur lors de l'ajout ou de la réduction de l'argent: {e}")
        finally:
            cur.close()

# Fonction pour afficher l'historique des transactions d'un portefeuille
def view_transaction_history(conn):
    cur = conn.cursor()
    wallet_id = int(input("Entrez l'identifiant du portefeuille: "))

    try:
        cur.execute(
            "SELECT * FROM transactions WHERE wallet_id = %s",
            (wallet_id,)
        )
        rows = cur.fetchall()
        for row in rows:
            print(row)
        print("Historique des transactions affiché avec succès!")
    except psycopg2.Error as e:
        print(f"Erreur lors de l'affichage de l'historique des transactions: {e}")
    finally:
        cur.close()

# Fonction pour retirer de l'argent d'un portefeuille
def withdraw_money(conn):
    cur = conn.cursor()
    wallet_id = int(input("Entrez l'identifiant du portefeuille: "))
    amount = float(input("Entrez le montant à retirer: "))

    try:
        cur.execute(
            "SELECT montant_total FROM wallets WHERE id = %s",
            (wallet_id,)
        )
        current_amount = cur.fetchone()[0]
        if amount > 0:        
            if amount <= current_amount:
                cur.execute(
                    "UPDATE wallets SET solde_actuel = solde_actuel - %s WHERE id = %s",
                    (amount, wallet_id)
                )
                conn.commit()
                print("Argent retiré avec succès!")
            else:
                print("Fonds insuffisants!")
        else:
            print("Montant de retrait invalide!")
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Erreur lors du retrait d'argent: {e}")
    finally:
        cur.close()

# Fonction pour déposer de l'argent dans un portefeuille
def deposit_money(conn):
    cur = conn.cursor()
    wallet_id = int(input("Entrez l'identifiant du portefeuille: "))
    amount = float(input("Entrez le montant à déposer: "))

    try:
        cur.execute(
            "UPDATE wallets SET solde_actuel = solde_actuel + %s WHERE id = %s",
            (amount, wallet_id)
        )
        conn.commit()
        print("Argent déposé avec succès!")
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Erreur lors du dépôt d'argent: {e}")
    finally:
        cur.close()

# Fonction pour parser les arguments de ligne de commande
def parse_args():
    parser = argparse.ArgumentParser(description="Application de gestion de portefeuille virtuel")
    parser.add_argument("-u", "--create-user", action="store_true", help="Créer un nouvel utilisateur")
    parser.add_argument("-w", "--create-wallet", action="store_true", help="Créer un nouveau portefeuille")
    return parser.parse_args()

if __name__ == "__main__":
    conn = connect_to_db()

    if conn:
        args = parse_args()

        if args.create_user:
            create_user(conn)
        elif args.create_wallet:
            create_wallet(conn)
        else:
            while True:
                print("\n1. Créer un utilisateur")
                print("2. Créer un portefeuille")
                print("3. Ajouter/Réduire de l'argent")
                print("4. Voir l'historique des transactions")
                print("5. Retirer de l'argent")
                print("6. Déposer de l'argent")
                print("7. Quitter")
                option = int(input("Choisissez une option : "))

                if option == 1:
                    create_user(conn)
                elif option == 2:
                    create_wallet(conn)
                elif option == 3:
                    add_or_reduce_money(conn)
                elif option == 4:
                    view_transaction_history(conn)
                elif option == 5:
                    withdraw_money(conn)
                elif option == 6:
                    deposit_money(conn)
                elif option == 7:
                    break
                else:
                    print("Option invalide! Veuillez choisir à nouveau.")

        conn.close()
    else:
        print("Impossible de se connecter à la base de données. Vérifiez vos paramètres de connexion.")
