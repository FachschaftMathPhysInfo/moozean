class StudentResource < JSONAPI::Resource
  attributes :name, :uniid, :report, :refund, :matriculationnumber,:comment
  filter :name
  def self.apply_filter(records, filter, value, options = {})
    strategy = _allowed_filters.fetch(filter.to_sym, Hash.new)[:apply]

    if strategy
      if strategy.is_a?(Symbol) || strategy.is_a?(String)
        send(strategy, records, value, options)
      else
        strategy.call(records, value, options)
      end
    else
      value_regex = Array.wrap(value).join('|')
      records.where("#{filter} LIKE '#{value_regex}'")
    end
  end
end
