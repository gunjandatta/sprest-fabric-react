import { Promise } from "es6-promise";
import {
    ContextInfo,
    List,
    SPTypes,
    Types
} from "gd-sprest";

/**
 * The interface for the data.
 */
export interface IData {
    Title: string;
    County: string;
    State: string;
}

/**
 * Data Source
 */
export class Data {
    /**
     * Properties
     */
    private static get IsSPOnline(): boolean { return ContextInfo.existsFl; }

    /**
     * Public Methods
     */

    // Method to add an item to the list
    static addItem(item: IData): PromiseLike<any> {
        return new Promise((resolve, reject) => {
            // Ensure we are online
            if (!this.IsSPOnline) {
                // Resolve the promise
                resolve();
                return;
            }

            // Get the list
            (new List("Locations"))
                // Get the items
                .Items()
                // Add the item
                .add(item)
                // Execute the request
                .execute((item) => {
                    // Resolve the promise
                    resolve(item);
                });
        });
    }

    // Method to get the data
    static get(): PromiseLike<IData[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // See if the $REST library exists
            if (this.IsSPOnline) {
                // Get the list
                (new List("Locations"))
                    // Get the items
                    .Items()
                    // Query the data
                    .query({
                        GetAllItems: true,
                        OrderBy: ["State", "County", "Title"],
                        Top: 500
                    })
                    // Execute the request
                    .execute((items) => {
                        let data: IData[] = [];

                        // Parse the items
                        for (let item of items.results) {
                            // Add the item to the data array
                            data.push({
                                Title: item["Title"],
                                County: item["County"],
                                State: item["State"]
                            });
                        }

                        // Resolve the request
                        resolve(data);
                    });
            } else {
                // Resolve the request with test data
                resolve(TestData);
            }
        });
    }
}

/**
 * Test Data
 */
const TestData: IData[] = [
    { Title: "Anchorage", County: "Anchorage", State: "AK" },
    { Title: "Fairbanks", County: "Fairbanks North Star", State: "AK" },
    { Title: "Little Rock", County: "Pulaski", State: "AR" },
    { Title: "Mesa", County: "Maricopa", State: "AZ" },
    { Title: "Peoria", County: "Maricopa", State: "AZ" },
    { Title: "Phoenix", County: "Maricopa", State: "AZ" },
    { Title: "Scottsdale", County: "Maricopa", State: "AZ" },
    { Title: "Berkeley", County: "Alameda", State: "CA" },
    { Title: "Hayward", County: "Alameda", State: "CA" },
    { Title: "Oakland", County: "Alameda", State: "CA" },
    { Title: "San Leandro", County: "Alameda", State: "CA" },
    { Title: "Oroville", County: "Butte", State: "CA" },
    { Title: "Concord", County: "Contra Costa", State: "CA" },
    { Title: "Oakley", County: "Contra Costa", State: "CA" },
    { Title: "San Ramon", County: "Contra Costa", State: "CA" },
    { Title: "Bellflower", County: "Los Angeles", State: "CA" },
    { Title: "Beverly Hills", County: "Los Angeles", State: "CA" },
    { Title: "El Monte", County: "Los Angeles", State: "CA" },
    { Title: "Gardena", County: "Los Angeles", State: "CA" },
    { Title: "Los Angeles", County: "Los Angeles", State: "CA" },
    { Title: "Northridge", County: "Los Angeles", State: "CA" },
    { Title: "Pasadena", County: "Los Angeles", State: "CA" },
    { Title: "Pomona", County: "Los Angeles", State: "CA" },
    { Title: "San Gabriel", County: "Los Angeles", State: "CA" },
    { Title: "Van Nuys", County: "Los Angeles", State: "CA" },
    { Title: "Novato", County: "Marin", State: "CA" },
    { Title: "Anaheim", County: "Orange", State: "CA" },
    { Title: "Costa Mesa", County: "Orange", State: "CA" },
    { Title: "Huntington Beach", County: "Orange", State: "CA" },
    { Title: "Santa Ana", County: "Orange", State: "CA" },
    { Title: "Roseville", County: "Placer", State: "CA" },
    { Title: "Cathedral City", County: "Riverside", State: "CA" },
    { Title: "Riverside", County: "Riverside", State: "CA" },
    { Title: "Thousand Palms", County: "Riverside", State: "CA" },
    { Title: "Sacramento", County: "Sacramento", State: "CA" },
    { Title: "Ontario", County: "San Bernardino", State: "CA" },
    { Title: "San Bernardino", County: "San Bernardino", State: "CA" },
    { Title: "El Cajon", County: "San Diego", State: "CA" },
    { Title: "Escondido", County: "San Diego", State: "CA" },
    { Title: "La Mesa", County: "San Diego", State: "CA" },
    { Title: "San Diego", County: "San Diego", State: "CA" },
    { Title: "San Francisco", County: "San Francisco", State: "CA" },
    { Title: "Stockton", County: "San Joaquin", State: "CA" },
    { Title: "Burlingame", County: "San Mateo", State: "CA" },
    { Title: "Pacifica", County: "San Mateo", State: "CA" },
    { Title: "San Carlos", County: "San Mateo", State: "CA" },
    { Title: "San Mateo", County: "San Mateo", State: "CA" },
    { Title: "South San Francisco", County: "San Mateo", State: "CA" },
    { Title: "San Jose", County: "Santa Clara", State: "CA" },
    { Title: "Santa Clara", County: "Santa Clara", State: "CA" },
    { Title: "Saratoga", County: "Santa Clara", State: "CA" },
    { Title: "Rohnert Park", County: "Sonoma", State: "CA" },
    { Title: "Santa Rosa", County: "Sonoma", State: "CA" },
    { Title: "Camarillo", County: "Ventura", State: "CA" },
    { Title: "Thousand Oaks", County: "Ventura", State: "CA" },
    { Title: "Englewood", County: "Arapahoe", State: "CO" },
    { Title: "Boulder", County: "Boulder", State: "CO" },
    { Title: "Denver", County: "Denver", State: "CO" },
    { Title: "Littleton", County: "Douglas", State: "CO" },
    { Title: "Colorado Springs", County: "El Paso", State: "CO" },
    { Title: "Bridgeport", County: "Fairfield", State: "CT" },
    { Title: "Norwalk", County: "Fairfield", State: "CT" },
    { Title: "New Haven", County: "New Haven", State: "CT" },
    { Title: "North Haven", County: "New Haven", State: "CT" },
    { Title: "Washington", County: "District of Columbia", State: "DC" },
    { Title: "Cocoa", County: "Brevard", State: "FL" },
    { Title: "Satellite Beach", County: "Brevard", State: "FL" },
    { Title: "Crystal River", County: "Citrus", State: "FL" },
    { Title: "Homosassa", County: "Citrus", State: "FL" },
    { Title: "Jacksonville", County: "Duval", State: "FL" },
    { Title: "Brandon", County: "Hillsborough", State: "FL" },
    { Title: "Tampa", County: "Hillsborough", State: "FL" },
    { Title: "Hialeah", County: "Miami-Dade", State: "FL" },
    { Title: "Homestead", County: "Miami-Dade", State: "FL" },
    { Title: "Miami", County: "Miami-Dade", State: "FL" },
    { Title: "Opa Locka", County: "Miami-Dade", State: "FL" },
    { Title: "Crestview", County: "Okaloosa", State: "FL" },
    { Title: "Orlando", County: "Orange", State: "FL" },
    { Title: "Lake Worth", County: "Palm Beach", State: "FL" },
    { Title: "Longwood", County: "Seminole", State: "FL" },
    { Title: "Daytona Beach", County: "Volusia", State: "FL" },
    { Title: "Oak Hill", County: "Volusia", State: "FL" },
    { Title: "Trion", County: "Chattooga", State: "GA" },
    { Title: "Atlanta", County: "Dekalb", State: "GA" },
    { Title: "Albany", County: "Dougherty", State: "GA" },
    { Title: "Douglasville", County: "Douglas", State: "GA" },
    { Title: "Atlanta", County: "Fulton", State: "GA" },
    { Title: "Hilo", County: "Hawaii", State: "HI" },
    { Title: "Honolulu", County: "Honolulu", State: "HI" },
    { Title: "Pearl City", County: "Honolulu", State: "HI" },
    { Title: "Des Moines", County: "Polk", State: "IA" },
    { Title: "Boise", County: "Ada", State: "ID" },
    { Title: "Moscow", County: "Latah", State: "ID" },
    { Title: "Arlington Heights", County: "Cook", State: "IL" },
    { Title: "Chicago", County: "Cook", State: "IL" },
    { Title: "Elk Grove Village", County: "Cook", State: "IL" },
    { Title: "Evanston", County: "Cook", State: "IL" },
    { Title: "Palatine", County: "Cook", State: "IL" },
    { Title: "Rolling Meadows", County: "Cook", State: "IL" },
    { Title: "Wheeling", County: "Cook", State: "IL" },
    { Title: "Highland Park", County: "Lake", State: "IL" },
    { Title: "Rockford", County: "Winnebago", State: "IL" },
    { Title: "Fort Wayne", County: "Allen", State: "IN" },
    { Title: "Elkhart", County: "Elkhart", State: "IN" },
    { Title: "Fortville", County: "Hancock", State: "IN" },
    { Title: "Indianapolis", County: "Marion", State: "IN" },
    { Title: "Bloomington", County: "Monroe", State: "IN" },
    { Title: "South Bend", County: "St Joseph", State: "IN" },
    { Title: "Abilene", County: "Dickinson", State: "KS" },
    { Title: "Hays", County: "Ellis", State: "KS" },
    { Title: "Overland Park", County: "Johnson", State: "KS" },
    { Title: "Shawnee", County: "Johnson", State: "KS" },
    { Title: "Burlington", County: "Boone", State: "KY" },
    { Title: "Metairie", County: "Jefferson", State: "LA" },
    { Title: "Broussard", County: "Lafayette", State: "LA" },
    { Title: "Lafayette", County: "Lafayette", State: "LA" },
    { Title: "New Orleans", County: "Orleans", State: "LA" },
    { Title: "Houma", County: "Terrebonne", State: "LA" },
    { Title: "New Bedford", County: "Bristol", State: "MA" },
    { Title: "North Attleboro", County: "Bristol", State: "MA" },
    { Title: "Cambridge", County: "Middlesex", State: "MA" },
    { Title: "Concord", County: "Middlesex", State: "MA" },
    { Title: "Wilmington", County: "Middlesex", State: "MA" },
    { Title: "Middleboro", County: "Plymouth", State: "MA" },
    { Title: "Boston", County: "Suffolk", State: "MA" },
    { Title: "Westborough", County: "Worcester", State: "MA" },
    { Title: "Worcester", County: "Worcester", State: "MA" },
    { Title: "Glen Burnie", County: "Anne Arundel", State: "MD" },
    { Title: "Hanover", County: "Anne Arundel", State: "MD" },
    { Title: "Owings Mills", County: "Baltimore", State: "MD" },
    { Title: "Parkville", County: "Baltimore", State: "MD" },
    { Title: "Baltimore", County: "Baltimore City", State: "MD" },
    { Title: "Preston", County: "Caroline", State: "MD" },
    { Title: "Hampstead", County: "Carroll", State: "MD" },
    { Title: "Aberdeen", County: "Harford", State: "MD" },
    { Title: "Bladensburg", County: "Prince Georges", State: "MD" },
    { Title: "Clinton", County: "Prince Georges", State: "MD" },
    { Title: "Hyattsville", County: "Prince Georges", State: "MD" },
    { Title: "Easton", County: "Talbot", State: "MD" },
    { Title: "Salisbury", County: "Wicomico", State: "MD" },
    { Title: "Warren", County: "Knox", State: "ME" },
    { Title: "Bangor", County: "Penobscot", State: "ME" },
    { Title: "Niles", County: "Berrien", State: "MI" },
    { Title: "East Lansing", County: "Ingham", State: "MI" },
    { Title: "Lansing", County: "Ingham", State: "MI" },
    { Title: "Grand Rapids", County: "Kent", State: "MI" },
    { Title: "Brighton", County: "Livingston", State: "MI" },
    { Title: "Sterling Heights", County: "Macomb", State: "MI" },
    { Title: "Milan", County: "Monroe", State: "MI" },
    { Title: "Muskegon", County: "Muskegon", State: "MI" },
    { Title: "Rochester", County: "Oakland", State: "MI" },
    { Title: "Southfield", County: "Oakland", State: "MI" },
    { Title: "Waterford", County: "Oakland", State: "MI" },
    { Title: "Ann Arbor", County: "Washtenaw", State: "MI" },
    { Title: "Dearborn", County: "Wayne", State: "MI" },
    { Title: "Taylor", County: "Wayne", State: "MI" },
    { Title: "Burnsville", County: "Dakota", State: "MN" },
    { Title: "Hopkins", County: "Hennepin", State: "MN" },
    { Title: "Minneapolis", County: "Hennepin", State: "MN" },
    { Title: "Saint Paul", County: "Ramsey", State: "MN" },
    { Title: "Northfield", County: "Rice", State: "MN" },
    { Title: "Shakopee", County: "Scott", State: "MN" },
    { Title: "Saint Joseph", County: "Buchanan", State: "MO" },
    { Title: "Valley Park", County: "Saint Louis", State: "MO" },
    { Title: "Saint Louis", County: "Saint Louis City", State: "MO" },
    { Title: "Biloxi", County: "Harrison", State: "MS" },
    { Title: "Jackson", County: "Hinds", State: "MS" },
    { Title: "Meridian", County: "Lauderdale", State: "MS" },
    { Title: "Pearl", County: "Rankin", State: "MS" },
    { Title: "Butte", County: "Silver Bow", State: "MT" },
    { Title: "Burlington", County: "Alamance", State: "NC" },
    { Title: "Fayetteville", County: "Cumberland", State: "NC" },
    { Title: "Greensboro", County: "Guilford", State: "NC" },
    { Title: "High Point", County: "Guilford", State: "NC" },
    { Title: "Smithfield", County: "Johnston", State: "NC" },
    { Title: "Chapel Hill", County: "Orange", State: "NC" },
    { Title: "Raleigh", County: "Wake", State: "NC" },
    { Title: "Fargo", County: "Cass", State: "ND" },
    { Title: "Alliance", County: "Box Butte", State: "NE" },
    { Title: "Omaha", County: "Douglas", State: "NE" },
    { Title: "Plaistow", County: "Rockingham", State: "NH" },
    { Title: "Absecon", County: "Atlantic", State: "NJ" },
    { Title: "Atlantic City", County: "Atlantic", State: "NJ" },
    { Title: "Margate City", County: "Atlantic", State: "NJ" },
    { Title: "Englewood", County: "Bergen", State: "NJ" },
    { Title: "Hackensack", County: "Bergen", State: "NJ" },
    { Title: "Lyndhurst", County: "Bergen", State: "NJ" },
    { Title: "Paramus", County: "Bergen", State: "NJ" },
    { Title: "Ramsey", County: "Bergen", State: "NJ" },
    { Title: "Ridgefield Park", County: "Bergen", State: "NJ" },
    { Title: "Riverton", County: "Burlington", State: "NJ" },
    { Title: "Cherry Hill", County: "Camden", State: "NJ" },
    { Title: "Bloomfield", County: "Essex", State: "NJ" },
    { Title: "Cedar Grove", County: "Essex", State: "NJ" },
    { Title: "Fairfield", County: "Essex", State: "NJ" },
    { Title: "Livingston", County: "Essex", State: "NJ" },
    { Title: "Newark", County: "Essex", State: "NJ" },
    { Title: "Nutley", County: "Essex", State: "NJ" },
    { Title: "Orange", County: "Essex", State: "NJ" },
    { Title: "Bridgeport", County: "Gloucester", State: "NJ" },
    { Title: "Harrison", County: "Hudson", State: "NJ" },
    { Title: "Jersey City", County: "Hudson", State: "NJ" },
    { Title: "Kearny", County: "Hudson", State: "NJ" },
    { Title: "Union City", County: "Hudson", State: "NJ" },
    { Title: "Flemington", County: "Hunterdon", State: "NJ" },
    { Title: "Pittstown", County: "Hunterdon", State: "NJ" },
    { Title: "Trenton", County: "Mercer", State: "NJ" },
    { Title: "Dunellen", County: "Middlesex", State: "NJ" },
    { Title: "Middlesex", County: "Middlesex", State: "NJ" },
    { Title: "Monroe Township", County: "Middlesex", State: "NJ" },
    { Title: "Freehold", County: "Monmouth", State: "NJ" },
    { Title: "Denville", County: "Morris", State: "NJ" },
    { Title: "Randolph", County: "Morris", State: "NJ" },
    { Title: "Rockaway", County: "Morris", State: "NJ" },
    { Title: "Whippany", County: "Morris", State: "NJ" },
    { Title: "Toms River", County: "Ocean", State: "NJ" },
    { Title: "Clifton", County: "Passaic", State: "NJ" },
    { Title: "Little Falls", County: "Passaic", State: "NJ" },
    { Title: "Passaic", County: "Passaic", State: "NJ" },
    { Title: "Paterson", County: "Passaic", State: "NJ" },
    { Title: "Bridgewater", County: "Somerset", State: "NJ" },
    { Title: "Somerset", County: "Somerset", State: "NJ" },
    { Title: "Somerville", County: "Somerset", State: "NJ" },
    { Title: "Plainfield", County: "Union", State: "NJ" },
    { Title: "Clovis", County: "Curry", State: "NM" },
    { Title: "Las Cruces", County: "Dona Ana", State: "NM" },
    { Title: "Carson City", County: "Carson City", State: "NV" },
    { Title: "Reno", County: "Washoe", State: "NV" },
    { Title: "Albany", County: "Albany", State: "NY" },
    { Title: "Wellsville", County: "Allegany", State: "NY" },
    { Title: "Bronx", County: "Bronx", State: "NY" },
    { Title: "Vestal", County: "Broome", State: "NY" },
    { Title: "Buffalo", County: "Erie", State: "NY" },
    { Title: "Brooklyn", County: "Kings", State: "NY" },
    { Title: "Garden City", County: "Nassau", State: "NY" },
    { Title: "Hicksville", County: "Nassau", State: "NY" },
    { Title: "Lynbrook", County: "Nassau", State: "NY" },
    { Title: "Massapequa", County: "Nassau", State: "NY" },
    { Title: "Syosset", County: "Nassau", State: "NY" },
    { Title: "Westbury", County: "Nassau", State: "NY" },
    { Title: "New York", County: "New York", State: "NY" },
    { Title: "Utica", County: "Oneida", State: "NY" },
    { Title: "Syracuse", County: "Onondaga", State: "NY" },
    { Title: "Port Jervis", County: "Orange", State: "NY" },
    { Title: "Astoria", County: "Queens", State: "NY" },
    { Title: "Long Island City", County: "Queens", State: "NY" },
    { Title: "Troy", County: "Rensselaer", State: "NY" },
    { Title: "Staten Island", County: "Richmond", State: "NY" },
    { Title: "Bohemia", County: "Suffolk", State: "NY" },
    { Title: "Coram", County: "Suffolk", State: "NY" },
    { Title: "Deer Park", County: "Suffolk", State: "NY" },
    { Title: "Middle Island", County: "Suffolk", State: "NY" },
    { Title: "Ronkonkoma", County: "Suffolk", State: "NY" },
    { Title: "Katonah", County: "Westchester", State: "NY" },
    { Title: "Mount Vernon", County: "Westchester", State: "NY" },
    { Title: "Pelham", County: "Westchester", State: "NY" },
    { Title: "Yonkers", County: "Westchester", State: "NY" },
    { Title: "Ashland", County: "Ashland", State: "OH" },
    { Title: "Hamilton", County: "Butler", State: "OH" },
    { Title: "Bucyrus", County: "Crawford", State: "OH" },
    { Title: "Beachwood", County: "Cuyahoga", State: "OH" },
    { Title: "Brook Park", County: "Cuyahoga", State: "OH" },
    { Title: "Cleveland", County: "Cuyahoga", State: "OH" },
    { Title: "Strongsville", County: "Cuyahoga", State: "OH" },
    { Title: "Columbus", County: "Franklin", State: "OH" },
    { Title: "Chagrin Falls", County: "Geauga", State: "OH" },
    { Title: "Cincinnati", County: "Hamilton", State: "OH" },
    { Title: "Findlay", County: "Hancock", State: "OH" },
    { Title: "Toledo", County: "Lucas", State: "OH" },
    { Title: "London", County: "Madison", State: "OH" },
    { Title: "Canton", County: "Stark", State: "OH" },
    { Title: "Akron", County: "Summit", State: "OH" },
    { Title: "Barberton", County: "Summit", State: "OH" },
    { Title: "Bowling Green", County: "Wood", State: "OH" },
    { Title: "Perrysburg", County: "Wood", State: "OH" },
    { Title: "Tulsa", County: "Tulsa", State: "OK" },
    { Title: "Prineville", County: "Crook", State: "OR" },
    { Title: "Eugene", County: "Lane", State: "OR" },
    { Title: "Salem", County: "Marion", State: "OR" },
    { Title: "Portland", County: "Multnomah", State: "OR" },
    { Title: "Beaverton", County: "Washington", State: "OR" },
    { Title: "Portland", County: "Washington", State: "OR" },
    { Title: "Richboro", County: "Bucks", State: "PA" },
    { Title: "Southampton", County: "Bucks", State: "PA" },
    { Title: "Coatesville", County: "Chester", State: "PA" },
    { Title: "Harrisburg", County: "Dauphin", State: "PA" },
    { Title: "Aston", County: "Delaware", State: "PA" },
    { Title: "Wayne", County: "Delaware", State: "PA" },
    { Title: "Erie", County: "Erie", State: "PA" },
    { Title: "Clarks Summit", County: "Lackawanna", State: "PA" },
    { Title: "Old Forge", County: "Lackawanna", State: "PA" },
    { Title: "Scranton", County: "Lackawanna", State: "PA" },
    { Title: "Denver", County: "Lancaster", State: "PA" },
    { Title: "Lancaster", County: "Lancaster", State: "PA" },
    { Title: "Hazleton", County: "Luzerne", State: "PA" },
    { Title: "Hatfield", County: "Montgomery", State: "PA" },
    { Title: "Huntingdon Valley", County: "Montgomery", State: "PA" },
    { Title: "Jenkintown", County: "Montgomery", State: "PA" },
    { Title: "King of Prussia", County: "Montgomery", State: "PA" },
    { Title: "Kulpsville", County: "Montgomery", State: "PA" },
    { Title: "Philadelphia", County: "Philadelphia", State: "PA" },
    { Title: "York", County: "York", State: "PA" },
    { Title: "Johnston", County: "Providence", State: "RI" },
    { Title: "Providence", County: "Providence", State: "RI" },
    { Title: "Columbia", County: "Richland", State: "SC" },
    { Title: "Spartanburg", County: "Spartanburg", State: "SC" },
    { Title: "Sioux Falls", County: "Minnehaha", State: "SD" },
    { Title: "Moss", County: "Clay", State: "TN" },
    { Title: "Tullahoma", County: "Coffee", State: "TN" },
    { Title: "Nashville", County: "Davidson", State: "TN" },
    { Title: "Memphis", County: "Shelby", State: "TN" },
    { Title: "Mc Minnville", County: "Warren", State: "TN" },
    { Title: "San Antonio", County: "Bexar", State: "TX" },
    { Title: "College Station", County: "Brazos", State: "TX" },
    { Title: "Plano", County: "Collin", State: "TX" },
    { Title: "Dallas", County: "Dallas", State: "TX" },
    { Title: "Irving", County: "Dallas", State: "TX" },
    { Title: "Mesquite", County: "Dallas", State: "TX" },
    { Title: "El Paso", County: "El Paso", State: "TX" },
    { Title: "Kerrville", County: "Kerr", State: "TX" },
    { Title: "Waco", County: "McLennan", State: "TX" },
    { Title: "Conroe", County: "Montgomery", State: "TX" },
    { Title: "Amarillo", County: "Randall", State: "TX" },
    { Title: "Arlington", County: "Tarrant", State: "TX" },
    { Title: "Euless", County: "Tarrant", State: "TX" },
    { Title: "Fort Worth", County: "Tarrant", State: "TX" },
    { Title: "Kennedale", County: "Tarrant", State: "TX" },
    { Title: "Abilene", County: "Taylor", State: "TX" },
    { Title: "Austin", County: "Travis", State: "TX" },
    { Title: "Laredo", County: "Webb", State: "TX" },
    { Title: "Wichita Falls", County: "Wichita", State: "TX" },
    { Title: "Round Rock", County: "Williamson", State: "TX" },
    { Title: "Salt Lake City", County: "Salt Lake", State: "UT" },
    { Title: "Annandale", County: "Fairfax", State: "VA" },
    { Title: "McLean", County: "Fairfax", State: "VA" },
    { Title: "Fairfax", County: "Fairfax City", State: "VA" },
    { Title: "Newport News", County: "Newport News City", State: "VA" },
    { Title: "Richmond", County: "Richmond City", State: "VA" },
    { Title: "Richland", County: "Benton", State: "WA" },
    { Title: "Kent", County: "King", State: "WA" },
    { Title: "Seattle", County: "King", State: "WA" },
    { Title: "Vashon", County: "King", State: "WA" },
    { Title: "Tacoma", County: "Pierce", State: "WA" },
    { Title: "Bothell", County: "Snohomish", State: "WA" },
    { Title: "Green Bay", County: "Brown", State: "WI" },
    { Title: "Madison", County: "Dane", State: "WI" },
    { Title: "Milwaukee", County: "Milwaukee", State: "WI" },
    { Title: "Stevens Point", County: "Portage", State: "WI" },
    { Title: "Beloit", County: "Rock", State: "WI" },
    { Title: "Riverton", County: "Fremont", State: "WY" },
    { Title: "Cheyenne", County: "Laramie", State: "WY" },
    { Title: "Rock Springs", County: "Sweetwater", State: "WY" }
];