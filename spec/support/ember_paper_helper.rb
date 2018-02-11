module EmberPaperHelper
  def fill_in_autocomplete(caption,options={})
    fill_in caption, with: options[:with]
    el = find('li', :text=>/#{Regexp.quote(options[:with])}/,:match => :first)
    el.click
  end
  def fill_in_chips(caption,values=[])
    values.each do |value|
      fill_in_autocomplete caption, with: value
    end
  end
end
