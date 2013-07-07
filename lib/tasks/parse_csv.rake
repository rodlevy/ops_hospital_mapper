require 'csv'

namespace :db do
  desc "parse csv files for hospitally database"
  task :parse_csv_hospitally  => :environment do
    hosp_il = File.open(File.join(Rails.root, "dataset", "hospitals_il.csv"),"r")
    csv_hosp_il = CSV.parse(hosp_il, :headers => true)
    csv_hosp_il.each do |row|
      Hospital.find_or_create!(row.to_hash)
    end

    hosp_usa = File.open(File.join(Rails.root, "dataset", "hospitals_usa.csv"),"r")
    csv_hosp_usa = CSV.parse(hosp_usa, :headers => true)
    csv_hosp_usa.each do |row|
      Hospital.find_or_create!(row.to_hash)
    end

    procedure_usa = File.open(File.join(Rails.root, "dataset", "procedures_usa_all.csv"),"r")
    csv_procedure_usa = CSV.parse(procedure_usa, :headers => true)
    csv_procedure_usa.each do |row|
      Procedure.create!(row.to_hash)
    end

    hosp_procedure_il = File.open(File.join(Rails.root, "dataset", "cms_chargemaster_inpatient_2011_il.csv"),"r")
    csv_hosp_procedure_il = CSV.parse(hosp_procedure_il, :headers => true)
    csv_hosp_procedure_il.each do |row|
      HospitalsProcedure.create!(row.to_hash)
    end

    hosp_procedure_usa = File.open(File.join(Rails.root, "dataset", "cms_chargemaster_inpatient_2011_usa.csv"),"r")
    csv_hosp_procedure_usa = CSV.parse(hosp_procedure_usa, :headers => true)
    csv_hosp_procedure_usa.each do |row|
      HospitalsProcedure.create!(row.to_hash)
    end

    outcome_il = File.open(File.join(Rails.root, "dataset", "hospital_mortality_il.csv"),"r")
    csv_outcome_il = CSV.parse(outcome_il, :headers => true)
    csv_outcome_il.each do |row|
      Outcome.create!(row.to_hash)
    end

    outcome_usa = File.open(File.join(Rails.root, "dataset", "hospital_mortality_usa.csv"),"r")
    csv_outcome_usa = CSV.parse(outcome_usa, :headers => true)
    csv_outcome_usa.each do |row|
      Outcome.create!(row.to_hash)
    end

    complications_il = File.open(File.join(Rails.root, "dataset", "agency_for_healthcare_research_and_quality_measures_il.csv"),"r")
    csv_complications_il = CSV.parse(complications_il, :headers => true)
    csv_complications_il.each do |row|
      Complication.create!(row.to_hash)
    end

    complications_usa = File.open(File.join(Rails.root, "dataset", "agency_for_healthcare_research_and_quality_measures_usa.csv"),"r")
    csv_complications_usa = CSV.parse(complications_usa, :headers => true)
    csv_complications_usa.each do |row|
      Complication.create!(row.to_hash)
    end

    surveys_il = File.open(File.join(Rails.root, "dataset", "patient_survey_il.csv"),"r")
    csv_surveys_il = CSV.parse(surveys_il, :headers => true)
    csv_surveys_il.each do |row|
      PatientSurvey.create!(row.to_hash)
    end

    surveys_usa = File.open(File.join(Rails.root, "dataset", "patient_survey_usa.csv"),"r")
    csv_surveys_usa = CSV.parse(surveys_usa, :headers => true)
    csv_surveys_usa.each do |row|
      PatientSurvey.create!(row.to_hash)
    end
  end
end
