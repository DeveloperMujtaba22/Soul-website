"use client";

import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

const Application = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    participatedYn: "",
    currentAddress: "",
    zipCode: "",
    district: "",
    raceEthnicity: "",
    gender: "",
    instituteOfEducation: "",
    email: "",
    telephone: "",
    parentFirstName: "",
    parentLastName: "",
    parentMailingAddress: "",
    parentHomeTelephone: "",
    parentWorkTelephone: "",
    parentEmail: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyMailingAddress: "",
    emergencyHomeTelephone: "",
    emergencyWorkTelephone: "",
    emergencyEmail: "",
    emergencyRelationship: "",
    participatedReasons: "",
    challengesCommunity: "",
    personalStrengths: "",
    creativeChallenges: "",
    primaryGoals: "",
    problemAreas: "",
    eventsActivities: "",
    skillsImprove: "",
    activitiesWorkshops: "",
    learningStyle: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`); // DEBUG
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateSection = (section) => {
    const errors = {};

    if (section === 1) {
      if (!formData.firstName.trim())
        errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        errors.email = "Invalid email format";
      if (!formData.participatedYn)
        errors.participatedYn = "Please select an option";
    }

    return errors;
  };

  const handleNext = () => {
    const errors = validateSection(currentSection);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setValidationErrors({});
    setCurrentSection((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setValidationErrors({});
    setCurrentSection((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("=== SUBMIT BUTTON CLICKED ===");
    console.log("Current Section:", currentSection);

    // Only allow submission from section 4
    if (currentSection !== 4) {
      console.log("Not on section 4, aborting submit");
      return;
    }

    const errors = validateSection(1);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setCurrentSection(1);
      setSubmitError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setValidationErrors({});

    // DEBUG: Log what we're about to send
    console.log("=== FORM DATA TO SUBMIT ===");
    console.log("Form Data State:", formData);

    const dataToInsert = {
  first_name: formData.firstName,
  last_name: formData.lastName,
  date_of_birth: formData.dateOfBirth || null,
  age: formData.age ? parseInt(formData.age) : null,
  participated_yn: formData.participatedYn === "yes",
  current_address: formData.currentAddress,
  zip_code: formData.zipCode,
  district: formData.district,
  race_ethnicity: formData.raceEthnicity,
  gender: formData.gender,
  institute_of_education: formData.instituteOfEducation,
  email: formData.email,
  insurance: formData.telephone,
  parent_first_name: formData.parentFirstName,
  parent_last_name: formData.parentLastName,
  parent_mailing_address: formData.parentMailingAddress,
  parent_email: formData.parentEmail,
  parent_home_daytime: formData.parentHomeTelephone,  // ADD THIS LINE
  parent_work_daytime: formData.parentWorkTelephone,
  emergency_first_name: formData.emergencyFirstName,
  emergency_last_name: formData.emergencyLastName,
  emergency_mailing_address: formData.emergencyMailingAddress,
  emergency_home_daytime: formData.emergencyHomeTelephone,  // ADD THIS LINE
  emergency_work_daytime: formData.emergencyWorkTelephone,
  emergency_email: formData.emergencyEmail || null,
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
  additional_info: formData.additionalInfo,
};

    console.log("Data to Insert:", dataToInsert);

    try {
      const { data, error } = await supabase
        .from("applications")
        .insert([dataToInsert])
        .select();

      console.log("Supabase Response:", { data, error });

      if (error) throw error;

      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          age: "",
          participatedYn: "",
          currentAddress: "",
          zipCode: "",
          district: "",
          raceEthnicity: "",
          gender: "",
          instituteOfEducation: "",
          email: "",
          telephone: "",
          parentFirstName: "",
          parentLastName: "",
          parentMailingAddress: "",
          parentHomeTelephone: "",
          parentWorkTelephone: "",
          parentEmail: "",
          emergencyFirstName: "",
          emergencyLastName: "",
          emergencyMailingAddress: "",
          emergencyHomeTelephone: "",
          emergencyWorkTelephone: "",
          emergencyEmail: "",
          emergencyRelationship: "",
          participatedReasons: "",
          challengesCommunity: "",
          personalStrengths: "",
          creativeChallenges: "",
          primaryGoals: "",
          problemAreas: "",
          eventsActivities: "",
          skillsImprove: "",
          activitiesWorkshops: "",
          learningStyle: "",
          additionalInfo: "",
        });
        setCurrentSection(1);
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError(
        error.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border ${
                    validationErrors.firstName
                      ? "border-red-500"
                      : "border-gray-600/50"
                  } text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition`}
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border ${
                    validationErrors.lastName
                      ? "border-red-500"
                      : "border-gray-600/50"
                  } text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition`}
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="25"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Youth/Adult Participant{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="participatedYn"
                  value={formData.participatedYn}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border ${
                    validationErrors.participatedYn
                      ? "border-red-500"
                      : "border-gray-600/50"
                  } text-white focus:outline-none focus:border-gray-400 transition`}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {validationErrors.participatedYn && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.participatedYn}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="currentAddress"
                  placeholder="123 Main St"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="12345"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="District name"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Race/Ethnicity
                </label>
                <input
                  type="text"
                  name="raceEthnicity"
                  placeholder="Your race/ethnicity"
                  value={formData.raceEthnicity}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  placeholder="Your gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Release of Information: Y/N
                </label>
                <select
                  name="instituteOfEducation"
                  value={formData.instituteOfEducation}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white focus:outline-none focus:border-gray-400 transition"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="mail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-gray-600/50"
                  } text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Telephone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="123-456-7890"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              If participant is a minor, please provide parent/guardian
              information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="parentFirstName"
                  placeholder="Parent first name"
                  value={formData.parentFirstName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="parentLastName"
                  placeholder="Parent last name"
                  value={formData.parentLastName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Mailing Address
                </label>
                <input
                  type="text"
                  name="parentMailingAddress"
                  placeholder="123 Main St, City, State ZIP"
                  value={formData.parentMailingAddress}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Home Telephone
                </label>
                <input
                  type="tel"
                  name="parentHomeTelephone"
                  placeholder="123-456-7890"
                  value={formData.parentHomeTelephone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Work Telephone
                </label>
                <input
                  type="tel"
                  name="parentWorkTelephone"
                  placeholder="123-456-7890"
                  value={formData.parentWorkTelephone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="parentEmail"
                  placeholder="parent@example.com"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="emergencyFirstName"
                  placeholder="Emergency contact first name"
                  value={formData.emergencyFirstName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="emergencyLastName"
                  placeholder="Emergency contact last name"
                  value={formData.emergencyLastName}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="emergencyEmail"
                  placeholder="emergency@example.com"
                  value={formData.emergencyEmail}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Mailing Address
                </label>
                <input
                  type="text"
                  name="emergencyMailingAddress"
                  placeholder="123 Main St, City, State ZIP"
                  value={formData.emergencyMailingAddress}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Home Telephone
                </label>
                <input
                  type="tel"
                  name="emergencyHomeTelephone"
                  placeholder="123-456-7890"
                  value={formData.emergencyHomeTelephone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Work Telephone
                </label>
                <input
                  type="tel"
                  name="emergencyWorkTelephone"
                  placeholder="123-456-7890"
                  value={formData.emergencyWorkTelephone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  Relationship to Participant
                </label>
                <input
                  type="text"
                  name="emergencyRelationship"
                  placeholder="e.g., Mother, Father, Sibling, Friend"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                name: "participatedReasons",
                label:
                  "Why are you interested in participating in the Soul Champ program?",
              },
              {
                name: "challengesCommunity",
                label:
                  "What do you consider to be the biggest challenges facing your community?",
              },
              {
                name: "personalStrengths",
                label:
                  "What do you consider your personal strengths/talents? (Name 3)",
              },
              {
                name: "creativeChallenges",
                label: "What are some personal challenges you struggle with?",
              },
              {
                name: "primaryGoals",
                label:
                  "What are your primary goals for yourself (next 12 months)?",
              },
              {
                name: "problemAreas",
                label:
                  "Have you or anyone close to you had an issue or crisis?",
              },
              {
                name: "eventsActivities",
                label:
                  "Have you or anyone close to you had a suicide attempt or ideation?",
              },
              {
                name: "skillsImprove",
                label: "What skill(s) would you like to improve or acquire?",
              },
              {
                name: "activitiesWorkshops",
                label:
                  "What type of activities interest you? (drumming, art, sports, dance, meditation, etc.)",
              },
              {
                name: "learningStyle",
                label:
                  "What's your preferred learning style? (classroom, role-playing, lecture, reading, hands-on, etc.)",
              },
              {
                name: "additionalInfo",
                label: "Additional information or comments",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs sm:text-sm text-gray-300 mb-2">
                  {field.label}
                </label>
                <textarea
                  name={field.name}
                  placeholder="Your answer..."
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-black/40 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition resize-none"
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
       <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-4 py-8 sm:py-10 md:p-0 overflow-x-hidden">
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center -z-10"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920")',
        filter: "blur(10px) brightness(0.3)",
        transform: "scale(1.05)", // CHANGED from 1.1 to 1.05
      }}
    />
          <div className="absolute inset-0 bg-black/60 -z-10" />

        <div className="relative bg-black/50 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 w-full max-w-[96%] sm:max-w-[92%] md:max-w-3xl lg:max-w-4xl border border-gray-700/50 shadow-2xl">
          <div className="text-green-500 text-6xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">
            ✓
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-2">
            Thank you for your submission.
          </p>
          <p className="text-sm sm:text-base text-gray-400">
            We'll be in touch soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center  py-10 sm:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920")',
          filter: "blur(10px) brightness(0.3)",
          transform: "scale(1)",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative bg-black/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-[95%] sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl border border-gray-700/50 shadow-2xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-2">
          Soul Champ Immersive Training Application
        </h1>
        <p className="text-center text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
          Section {currentSection} -{" "}
          {currentSection === 1
            ? "Participant Information"
            : currentSection === 2
              ? "Parent/Guardian Information"
              : currentSection === 3
                ? "Emergency Contact Information"
                : "Soul Champ Questionnaire"}
        </p>

        <div className="flex justify-center items-center mb-6 sm:mb-8">
          {[1, 2, 3, 4].map((section, idx) => (
            <React.Fragment key={section}>
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all ${
                  currentSection === section
                    ? "bg-white text-black scale-110"
                    : currentSection > section
                      ? "bg-white text-black"
                      : "bg-gray-700 text-gray-400 border-2 border-gray-600"
                }`}
              >
                {section}
              </div>
              {idx < 3 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 transition-all ${
                    currentSection > section ? "bg-white" : "bg-gray-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
              e.preventDefault();
            }
          }}
        >
          {renderSection()}

          {submitError && (
            <div className="mt-4 p-3 sm:p-4 bg-red-600/80 backdrop-blur-sm text-white text-sm sm:text-base rounded-lg border border-red-500">
              {submitError}
            </div>
          )}

          {Object.keys(validationErrors).length > 0 && currentSection !== 1 && (
            <div className="mt-4 p-3 sm:p-4 bg-yellow-600/80 backdrop-blur-sm text-white text-sm sm:text-base rounded-lg border border-yellow-500">
              Please fill in all required fields in Section 1 before submitting.
            </div>
          )}

          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentSection === 1}
              className={`px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full font-semibold transition-all ${
                currentSection === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200 hover:scale-105"
              }`}
            >
              Back
            </button>

            {currentSection < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 hover:scale-105 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed hover:scale-105 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;