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
  ApplicationRecord.connection.reset_pk_sequence!('listings')

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
      photo_urls =
      ["https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-ali-m%C3%BCft%C3%BCo%C4%9Fullar%C4%B1-2282445.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-asad-photo-maldives-1268871.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-bianca-1560065.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-carlos-machado-1013427.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-dejan-nouval-2566860.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-dominika-roseclay-977739.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-eberhard-grossgasteiger-449461.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-eneida-nieves-803975.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-fomstock-com-1115804.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-frans-van-heerden-1438834.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-gerritt-tisdale-903028.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-gord-maclean-750697.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-gord-maclean-750697.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-jens-mahnke-1105754.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-jonathan-borba-2888492.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-kelly-2510067.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-valeriia-miller-2587054.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-tobias-bj%C3%B8rkli-1559825.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-matheus-bertelli-2351649.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-matheus-bertelli-2980955.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-niki-nagy-1694360.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-oleksandr-pidvalnyi-1170686.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-quang-nguyen-vinh-2155202.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-scott-webb-1022936.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-scott-webb-1029599.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-sebastian-palomino-1862402.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-sindre-fs-950058.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-luca-istrate-15469360.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-thgusstavo-santana-2102587.jpg",
        "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-binyamin-mellish-1396122.jpg"]
      Listing.create!(
        address: "#{Faker::Address.street_address}",
        lister_id: user.id,
        price: price,
        bed: beds,
        baths: baths,
        sqft: rand(500..3000),
        photo_urls: [photo_urls.sample],
        created_at: Time.now,
        updated_at: Time.now
      )
    end
  end

  puts "Done!"

end
