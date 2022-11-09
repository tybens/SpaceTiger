import json
import ast
import os
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from bs4 import BeautifulSoup

# ----------------------------------------------------------------------

# ems_rooms.txt contains the locations provided by the EMS Browse page
with open("ems_rooms.txt", "r", encoding="utf-8") as file:
    ems_rooms_txt = file.read()

# convert the txt file to a dict so we can work with it
ems_rooms_str = ast.literal_eval(ems_rooms_txt)
ems_rooms_dict = json.loads(ems_rooms_str)
ems_buildings = ems_rooms_dict["Buildings"]

# convert the dict into two separate dataframes, one for buildings and
# the other for rooms. we will isolate the LocationLinks of
ems_buildings_list = []
ems_rooms_list = []
for ems_building in ems_buildings:
    building_df = pd.DataFrame.from_dict(ems_building, orient="index")
    ems_buildings_list.append(building_df.transpose())

    ems_rooms = ems_building["Rooms"]
    for ems_room in ems_rooms:
        ems_room["Building"] = ems_building["DisplayText"]
        room_df = pd.DataFrame.from_dict(ems_room, orient="index")
        ems_rooms_list.append(room_df.transpose())

ems_buildings_df = pd.concat(ems_buildings_list)
ems_buildings_df.to_csv("ems_buildings.csv", index=False)

ems_rooms_df = pd.concat(ems_rooms_list)
ems_rooms_df.to_csv("ems_rooms.csv", index=False)

# ----------------------------------------------------------------------

# Log in to the EMS system
auth = {
    "username": os.getenv("NETID"), # set these vars in a .env file
    "password": os.getenv("PASS")
}

service = Service(executable_path=ChromeDriverManager().install())

options = webdriver.ChromeOptions()
options.add_argument("--headless")

driver = webdriver.Chrome(service=service, options=options)
driver.get("https://princeton.emscloudservice.com/web/SamlAuth.aspx")

driver.find_element(By.NAME, "username").send_keys(auth["username"])
driver.find_element(By.NAME, "password").send_keys(auth["password"])
driver.find_element(By.NAME, "submit").click()

WebDriverWait(driver, timeout=5).until(lambda d: d.find_element(By.CSS_SELECTOR, "#header-text"))
assert driver.find_element(By.CSS_SELECTOR, "#header-text").text == "Check for a Duo Push"

WebDriverWait(driver, timeout=25).until(lambda d: d.find_element(By.CSS_SELECTOR, "#trust-this-browser-label"))
assert driver.find_element(By.CSS_SELECTOR, "#trust-this-browser-label").text == "Trust this browser?"
driver.find_element(By.CSS_SELECTOR, "#trust-browser-button").click()

WebDriverWait(driver, timeout=25).until(lambda d: d.find_element(By.CSS_SELECTOR, "#onetrust-accept-btn-handler"))
driver.find_element(By.CSS_SELECTOR, "#onetrust-accept-btn-handler").click()

# Visit each room detail link
ems_rooms_features_list = []
for link in ems_rooms_df["LocationLink"].to_list():
    print(link)
    driver.get(f"https://princeton.emscloudservice.com{link}")
    soup = BeautifulSoup(driver.page_source, "html.parser")

    ems_rooms_features_row = {"LocationLink": link}
    room_details_table = soup.select("tbody[data-bind='foreach: roomDetails']")[0]
    for room_details_row in room_details_table.find_all("tr"):
        detail = room_details_row.find_all("td")
        ems_rooms_features_row[detail[0].text] = detail[1].text

    room_features = []
    features_table = soup.select("tbody[data-bind='foreach: Features']")[0]
    for features_row in features_table.find_all("tr"):
        feature = features_row.find("td").text
        room_features.append(feature)
    ems_rooms_features_row["Features"] = room_features
    ems_rooms_features_list.append(ems_rooms_features_row)

    images = []
    imgs = soup.select("#room-images img")
    for img in imgs:
        images.append(img["src"])
    ems_rooms_features_row["Images"] = images

ems_rooms_features_df = pd.DataFrame(ems_rooms_features_list)
ems_rooms_features_df.to_csv("ems_rooms_features.csv", index=False)

driver.quit()
