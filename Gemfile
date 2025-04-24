source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 8  '
# Use postgresql as the database for Active Record
gem 'pg'
# Use Puma as the app server
gem 'puma', '~> 6.6'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  gem 'listen', '~> 3.9.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.1.0'
end
gem 'faker'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'jsonapi-resources', '=0.10.7'
gem 'net-imap', require: false
gem 'net-pop', require: false
gem 'net-smtp', require: false
gem 'queue_classic'
gem 'tzinfo-data'

gem 'iconv'
gem 'mail'
gem 'psych', '< 4'
gem 'rails_12factor', group: [:staging, :production]
gem 'rails-erd'
gem 'whenever', :require => false

# Ruby 3.4 introduced a breaking change:  
# Several libraries that used to be part of Ruby's standard library automatically 
# (like csv, bigdecimal, stringio, psych, etc.) are no longer "default gems"
gem 'csv'
