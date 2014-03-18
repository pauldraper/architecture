package arch.controllers

import arch.views
import org.apache.commons.io.IOUtils
import play.api.mvc._
import play.api.Play.{current => application}

object ArchController extends Controller {

  def index() = Action {
    Ok(views.html.map())
  }

  def building(key: String) = Action {
    application.resourceAsStream(s"arch/shapes/data/$key.json") map { stream =>
      val buildingJson = IOUtils.toString(stream)
      Ok(views.html.building(buildingJson))
    } getOrElse {
      NotFound("Not found")
    }
  }

}
