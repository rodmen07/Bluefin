# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Listing.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition',
    email: 'demo@user.io',
    password: 'password'
  )

  # More users
  10.times do
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    })
  end

  # Create 3 listings for each user
  User.all.each do |user|
    3.times do
      beds = rand(1..5)
      if beds > 3
        baths = rand(2..beds)
      else
        baths = rand(1..beds)
      end
      price = beds * rand(150_000..300_000)
      Listing.create!(
        address: "#{Faker::Address.street_address}, San Francisco, CA #{Faker::Address.zip_code}",
        lister_id: user.id,
        price: price,
        bed: beds,
        baths: baths,
        sqft: rand(500..3000),
        created_at: Time.now,
        updated_at: Time.now
      )
    end
  end

  puts "Done!"
end


