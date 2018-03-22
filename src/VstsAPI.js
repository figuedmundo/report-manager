
const api = "https://abilacollection.visualstudio.com/DefaultCollection/Abila/_apis";
const version = "?api-version=2.0";


// Basic Authentication
const user = 'galba';
const password = 'Control123!';
let encodedAuth = btoa(`${user}:${password}`);

const headers = {
  'Accept': 'application/json',
  'Authorization': `Basic ${encodedAuth}`
}

// get test run
// https://abilacollection.visualstudio.com/DefaultCollection/d9babb9f-6361-40e9-90c7-825d2f52b52b/_apis/test/Runs/3106?api-version=2.0
export const getTestRun = (runId) =>
  fetch(`${api}/test/Runs/${runId}${version}`, { headers })
    // .then(res => console.log(res))
    .then(res => res.json())

export const getTestResults = (runId) =>
  fetch(`${api}/test/Runs/${runId}/results${version}`, { headers })
    .then(res => res.json())
    .then(data => data.value)

export const getTestResult = (runId, resultId) =>
  fetch(`${api}/test/runs/${runId}/results/${resultId}${version}`, { headers })
    .then(res => res.json())
    

// get test details. i.e. title, tags, legacy id
// https://abilacollection.visualstudio.com/DefaultCollection/d9babb9f-6361-40e9-90c7-825d2f52b52b/_apis/wit/workItems/20171?api-version=2.0
export const getWorkItem = (itemId) =>
  fetch(`${api}/wit/workItems/${itemId}${version}`, { headers })
    .then(res => res.json())
    .then(data =>  { return {"title": data.fields["System.Title"],
                       "legacyId": data.fields["AbilaAgile.LegacyID"],
                       "tags": data.fields["System.Tags"].split("; ")
                      } })
    

// 8. //Update test result
// PATCH
// https://abilacollection.visualstudio.com/DefaultCollection/Abila/_apis/test/runs/3154/results?api-version=3.0-preview
export const updateTestResult = (runId, result) =>  
  fetch(`${api}/test/runs/${runId}/results?api-version=3.0-preview`, {
    method: 'PATCH',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    
    body: JSON.stringify([result])
  }).then(res => res.json())

