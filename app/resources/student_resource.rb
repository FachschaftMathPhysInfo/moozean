class StudentResource < JSONAPI::Resource
  attributes :name, :uniid, :report, :refund, :matriculationnumber,:comment
  # Relationen zu bisher und aktuell ausgeliehene Ordner
  has_many :folders_lents, class_name:"Folder"
  has_many :folders_returneds, class_name:"Folder"
  filters :nameoruniid, :name
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
      verb="ILIKE"
      if filter == "id"
        verb="="
      end
      value_regex = Array.wrap(value).join('|')
      if filter == :nameoruniid
        records.where("name #{verb} '#{value_regex}' OR uniid #{verb} '#{value_regex}'");
      else
        records.where("#{filter} #{verb} '#{value_regex}'");
      end
    end
  end
end
