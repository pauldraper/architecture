package arch.controllers

import arch.views
import org.apache.commons.io.IOUtils
import play.api.libs.json.Json
import play.api.mvc._
import play.api.Play.{current => application}

object ArchController extends Controller {

  def index() = Action {
    Ok(views.html.map()).withHeaders(CACHE_CONTROL -> "public, max-age=3600")
  }

  def building(key: String) = Action {
    application.resourceAsStream(s"arch/shapes/data/$key.json") map { stream =>
      val buildingJson = Json.parse(IOUtils.toByteArray(stream))
      Ok(views.html.building(buildingJson)).withHeaders(CACHE_CONTROL -> "public, max-age=3600")
    } getOrElse {
      NotFound("Not found")
    }
  }

}
