class StudentResource < JSONAPI::Resource
  attributes :name, :uniid, :report, :refund, :matriculationnumber,:comment
  # Relationen zu bisher und aktuell ausgeliehene Ordner
  has_many :folders_lents, class_name:"Folder"
  has_many :folders_returneds, class_name:"Folder"
  filter :name
  paginator :offset
  def self.apply_filter(records, filter, value, options = {})
    strategy = _allowed_filters.fetch(filter.to_sym, Hash.new)[:apply]

    if strategy
      if strategy.is_a?(Symbol) || strategy.is_a?(String)
        send(strategy, records, value, options)
      else
        strategy.call(records, value, options)
      end
    else
      verb="LIKE"
      if filter == "id"
        verb="="
      end
      value_regex = Array.wrap(value).join('|')
      records.where("#{filter} #{verb} '#{value_regex}'")
    end
  end
end
