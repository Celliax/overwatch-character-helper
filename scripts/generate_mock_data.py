import random
import json
from datetime import datetime, timedelta

heroes = [
    ("Tracer", "Damage"),
    ("Genji", "Damage"),
    ("Sojourn", "Damage"),
    ("Ashe", "Damage"),
    ("Venture", "Damage"),
    ("Widowmaker", "Damage"),
    ("Ana", "Support"),
    ("Kiriko", "Support"),
    ("Illari", "Support"),
    ("Juno", "Support"),
    ("Mercy", "Support"),
    ("Lifeweaver", "Support"),
    ("Reinhardt", "Tank"),
    ("Winston", "Tank"),
    ("Ramattra", "Tank"),
    ("Mauga", "Tank"),
    ("Doomfist", "Tank"),
    ("Hazard", "Tank")
]

maps = [
    ("King's Row", "Hybrid"),
    ("Circuit Royal", "Escort"),
    ("Runasapi", "Push"),
    ("Suravasa", "Flashpoint"),
    ("New Junk City", "Flashpoint"),
    ("Samoa", "Control"),
    ("Colosseo", "Push"),
    ("Esperança", "Push"),
    ("Shambali Monastery", "Escort"),
    ("Midtown", "Hybrid"),
    ("Paraiso", "Hybrid"),
    ("Oasis", "Control")
]

tiers = [
    "Bronze", "Silver", "Gold", "Platinum",
    "Diamond", "Master", "Grandmaster", "Champion"
]

regions = ["KR", "NA", "EU", "JP"]

def random_date():
    start = datetime.now() - timedelta(days=90)
    random_days = random.randint(0, 90)
    random_seconds = random.randint(0, 86400)
    return (start + timedelta(days=random_days, seconds=random_seconds)).isoformat()

def generate_match(match_id):
    hero, role = random.choice(heroes)
    game_map, mode = random.choice(maps)

    kills = random.randint(0, 35)
    deaths = random.randint(1, 18)
    assists = random.randint(0, 30)

    damage = random.randint(2000, 25000)
    healing = random.randint(0, 22000) if role == "Support" else 0
    mitigation = random.randint(0, 18000) if role == "Tank" else 0

    return {
        "match_id": match_id,
        "player_id": f"PLAYER_{random.randint(10000, 99999)}",
        "hero": hero,
        "role": role,
        "map": game_map,
        "mode": mode,
        "tier": random.choice(tiers),
        "region": random.choice(regions),
        "result": random.choice(["Win", "Lose"]),
        "kills": kills,
        "deaths": deaths,
        "assists": assists,
        "kda": round((kills + assists) / deaths, 2),
        "damage": damage,
        "healing": healing,
        "mitigation": mitigation,
        "match_time_min": random.randint(8, 28),
        "timestamp": random_date()
    }

DATA_SIZE = 1000

mock_data = [generate_match(i) for i in range(1, DATA_SIZE + 1)]

with open("overwatch2_ranked_mock_data.json", "w", encoding="utf-8") as f:
    json.dump(mock_data, f, ensure_ascii=False, indent=2)

print(f"{DATA_SIZE}개 데이터 생성 완료")
