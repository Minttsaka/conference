// API client for the conference app to communicate with the main app

// Function to fetch meeting data from the main app
export async function getMeeting(meetingId: string) {
  try {

    const response = await fetch(`http://localhost:3000/api/get-meeting/${meetingId}`)

    if (!response.ok) {
      if (response.status === 401) {
        return { error: "unauthorized" }
      }
      if (response.status === 404) {
        return { error: "not_found" }
      }
      return { error: "server_error" }
    }

    const data = await response.json()
    return { meeting: data }
  } catch (error) {
    console.error("Error fetching meeting:", error)
    return { error: "fetch_error" }
  }
}

// Function to get participants for a meeting
export async function getMeetingParticipants(meetingId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/api/meetings/${meetingId}/participants`, {
      credentials: "include", // Include cookies for authentication
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        return { error: "unauthorized" }
      }
      if (response.status === 404) {
        return { error: "not_found" }
      }
      return { error: "server_error" }
    }

    const data = await response.json()
    return { participants: data.participants }
  } catch (error) {
    console.error("Error fetching participants:", error)
    return { error: "fetch_error" }
  }
}

// Function to record attendance (join/leave)
export async function recordAttendance(meetingId: string, action: "join" | "leave") {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/api/meetings/${meetingId}/attendance`, {
      method: "POST",
      credentials: "include", // Include cookies for authentication
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    })

    if (!response.ok) {
      if (response.status === 401) {
        return { error: "unauthorized" }
      }
      if (response.status === 404) {
        return { error: "not_found" }
      }
      return { error: "server_error" }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error(`Error recording ${action}:`, error)
    return { error: "fetch_error" }
  }
}

export async function getFiles(meetingId: string) {

  console.log("meeting id",meetingId)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/api/files/${meetingId}`)

    if (!response.ok) {
      if (response.status === 401) {
        return { error: "unauthorized" }
      }
      if (response.status === 404) {
        return { error: "not_found" }
      }
      return { error: "server_error" }
    }

    const data = await response.json()

    console.log("the files",data)
    return { success: true, data }
  } catch (error) {
    console.error(`error fetch`, error)
    return { error: "fetch_error" }
  }
}



