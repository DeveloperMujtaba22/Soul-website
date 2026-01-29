// app/api/submit-application/route.js
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  try {
    const formData = await request.json()

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          email: formData.email,
          age: formData.age ? parseInt(formData.age) : null,
          current_address: formData.currentAddress,
          participated_yn: formData.participatedYn === 'yes',
          zip_code: formData.zipCode,
          gender: formData.gender,
          district: formData.district,
          race_ethnicity: formData.raceEthnicity,
          institute_of_education: formData.instituteOfEducation,
          insurance: formData.insurance,
          
          parent_first_name: formData.parentFirstName,
          parent_last_name: formData.parentLastName,
          parent_mailing_address: formData.parentMailingAddress,
          parent_email: formData.parentEmail,
          parent_work_daytime: formData.parentWorkDaytime,
          
          emergency_first_name: formData.emergencyFirstName,
          emergency_last_name: formData.emergencyLastName,
          emergency_mailing_address: formData.emergencyMailingAddress,
          emergency_email: formData.emergencyEmail,
          emergency_work_daytime: formData.emergencyWorkDaytime,
          emergency_relationship: formData.emergencyRelationship,
          
          participated_reasons: formData.participatedReasons,
          challenges_community: formData.challengesCommunity,
          personal_strengths: formData.personalStrengths,
          creative_challenges: formData.creativeChallenges,
          primary_goals: formData.primaryGoals,
          problem_areas: formData.problemAreas,
          events_activities: formData.eventsActivities,
          skills_improve: formData.skillsImprove,
          activities_workshops: formData.activitiesWorkshops,
          learning_style: formData.learningStyle,
          additional_info: formData.additionalInfo
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}